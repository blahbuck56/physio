import { useReducer, useEffect } from 'react';

const STORAGE_KEY = 'physioguide_state';

const defaultState = {
  screen: 'onboarding', // onboarding | dashboard | plan | player | feedback | summary | progress
  onboardingStep: 0,
  profile: null, // { injuryArea, painLevel, mobilityLevel }
  currentWeek: 1,
  streak: 0,
  lastSessionDate: null,
  completedSessions: [], // [{ date, duration, exercises, painBefore, painAfter, week }]
  painLog: [], // [{ date, level }]
  session: {
    active: false,
    exerciseIndex: 0,
    startTime: null,
    completedExercises: [], // [{ id, feedback, duration, startedAt, completedAt }]
  },
  // Post-session summary data (kept until user navigates away)
  lastSummary: null, // { exercises, totalDuration, feedbackCounts, overallFeeling }
  todayCompleted: false,
};

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...defaultState,
        ...parsed,
        screen: parsed.profile ? 'dashboard' : 'onboarding',
        session: { active: false, exerciseIndex: 0, startTime: null, completedExercises: [] },
        lastSummary: null,
      };
    }
  } catch (e) { /* ignore */ }
  return defaultState;
}

function calculateStreak(sessions, lastDate) {
  if (!lastDate) return 0;
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  const last = new Date(lastDate).toDateString();
  if (last !== today && last !== yesterday) return 0;

  let streak = 0;
  const dates = [...new Set(sessions.map(s => new Date(s.date).toDateString()))].sort(
    (a, b) => new Date(b) - new Date(a)
  );
  let checkDate = new Date(today);
  if (dates[0] !== today) {
    checkDate = new Date(yesterday);
  }
  for (const d of dates) {
    if (new Date(d).toDateString() === checkDate.toDateString()) {
      streak++;
      checkDate = new Date(checkDate.getTime() - 86400000);
    } else break;
  }
  return streak;
}

function isSameDay(d1, d2) {
  return new Date(d1).toDateString() === new Date(d2).toDateString();
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_SCREEN':
      return { ...state, screen: action.screen };

    case 'NEXT_ONBOARDING':
      return { ...state, onboardingStep: state.onboardingStep + 1 };

    case 'PREV_ONBOARDING':
      return { ...state, onboardingStep: Math.max(0, state.onboardingStep - 1) };

    case 'COMPLETE_ONBOARDING':
      return {
        ...state,
        profile: action.profile,
        screen: 'dashboard',
        onboardingStep: 0,
        currentWeek: 1,
        painLog: [{ date: new Date().toISOString(), level: action.profile.painLevel }],
      };

    case 'START_SESSION':
      return {
        ...state,
        screen: 'player',
        session: {
          active: true,
          exerciseIndex: 0,
          startTime: Date.now(),
          completedExercises: [],
        },
      };

    case 'START_EXERCISE':
      return {
        ...state,
        session: {
          ...state.session,
          currentExerciseStart: Date.now(),
        },
      };

    case 'COMPLETE_EXERCISE': {
      const now = Date.now();
      const exerciseDuration = state.session.currentExerciseStart
        ? Math.round((now - state.session.currentExerciseStart) / 1000)
        : 0;
      const completed = [
        ...state.session.completedExercises,
        {
          id: action.exerciseId,
          feedback: action.feedback,
          duration: exerciseDuration,
          completedAt: new Date().toISOString(),
        },
      ];
      return {
        ...state,
        screen: 'feedback',
        session: {
          ...state.session,
          completedExercises: completed,
          currentExerciseStart: null,
        },
      };
    }

    case 'NEXT_EXERCISE': {
      const nextIndex = state.session.exerciseIndex + 1;
      return {
        ...state,
        screen: 'player',
        session: {
          ...state.session,
          exerciseIndex: nextIndex,
          currentExerciseStart: Date.now(),
        },
      };
    }

    case 'COMPLETE_SESSION': {
      const now = new Date().toISOString();
      const sessionDuration = state.session.startTime
        ? Math.round((Date.now() - state.session.startTime) / 1000)
        : 0;

      // Build feedback counts
      const feedbackCounts = { easy: 0, normal: 0, hard: 0, painful: 0 };
      state.session.completedExercises.forEach(e => {
        if (feedbackCounts[e.feedback] !== undefined) feedbackCounts[e.feedback]++;
      });

      const summary = {
        exercises: state.session.completedExercises,
        totalDuration: sessionDuration,
        feedbackCounts,
        overallFeeling: null,
        date: now,
      };

      const newSession = {
        date: now,
        duration: sessionDuration,
        exercises: state.session.completedExercises,
        week: state.currentWeek,
      };
      const sessions = [...state.completedSessions, newSession];
      const todaysSessions = sessions.filter(s => isSameDay(s.date, now));
      const streak = calculateStreak(sessions, now);

      const weekSessions = sessions.filter(s => s.week === state.currentWeek);
      const nextWeek = weekSessions.length >= 3 && state.currentWeek < 4
        ? state.currentWeek + 1 : state.currentWeek;

      return {
        ...state,
        screen: 'summary',
        session: { active: false, exerciseIndex: 0, startTime: null, completedExercises: [] },
        completedSessions: sessions,
        lastSessionDate: now,
        streak,
        todayCompleted: todaysSessions.length > 0,
        currentWeek: nextWeek,
        lastSummary: summary,
      };
    }

    case 'SET_OVERALL_FEELING':
      return {
        ...state,
        lastSummary: state.lastSummary
          ? { ...state.lastSummary, overallFeeling: action.feeling }
          : null,
      };

    case 'LOG_PAIN':
      return {
        ...state,
        painLog: [...state.painLog, { date: new Date().toISOString(), level: action.level }],
      };

    case 'RESET':
      localStorage.removeItem(STORAGE_KEY);
      return defaultState;

    default:
      return state;
  }
}

export default function useAppState() {
  const [state, dispatch] = useReducer(reducer, null, loadState);

  // Persist to localStorage on state change
  useEffect(() => {
    const { screen, session, lastSummary, ...persist } = state;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persist));
  }, [state]);

  // Check if today is already completed
  useEffect(() => {
    if (state.lastSessionDate && isSameDay(state.lastSessionDate, new Date())) {
      if (!state.todayCompleted) {
        dispatch({ type: 'SET_SCREEN', screen: 'dashboard' });
      }
    }
  }, []);

  return [state, dispatch];
}
