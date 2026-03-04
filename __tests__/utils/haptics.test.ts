/**
 * Tests for src/utils/haptics.ts
 *
 * expo-haptics is mocked as a virtual module so that the dynamic require()
 * inside haptics.ts picks up the mock at module load time.
 * We reset modules before each test so we can swap Platform.OS freely.
 */

// The mock must be declared before any imports that touch the module under test.
jest.mock(
  'expo-haptics',
  () => ({
    impactAsync: jest.fn(),
    notificationAsync: jest.fn(),
    selectionAsync: jest.fn(),
    ImpactFeedbackStyle: { Light: 'Light', Medium: 'Medium', Heavy: 'Heavy' },
    NotificationFeedbackType: {
      Success: 'Success',
      Warning: 'Warning',
      Error: 'Error',
    },
  }),
  { virtual: true },
);

// We import Platform so we can override OS in some tests.
import { Platform } from 'react-native';
import { triggerHaptic } from '../../src/utils/haptics';

// Grab the mocked expo-haptics module.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const Haptics = require('expo-haptics') as {
  impactAsync: jest.Mock;
  notificationAsync: jest.Mock;
  selectionAsync: jest.Mock;
  ImpactFeedbackStyle: { Light: string; Medium: string; Heavy: string };
  NotificationFeedbackType: { Success: string; Warning: string; Error: string };
};

beforeEach(() => {
  jest.clearAllMocks();
  // Ensure we are on a non-web platform by default.
  Object.defineProperty(Platform, 'OS', { get: () => 'ios', configurable: true });
});

// ─── Impact haptics ───────────────────────────────────────────────────────────

describe('triggerHaptic — impact types', () => {
  it('calls impactAsync with Light for impactLight', async () => {
    await triggerHaptic('impactLight');
    expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Light);
    expect(Haptics.notificationAsync).not.toHaveBeenCalled();
    expect(Haptics.selectionAsync).not.toHaveBeenCalled();
  });

  it('calls impactAsync with Medium for impactMedium', async () => {
    await triggerHaptic('impactMedium');
    expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Medium);
  });

  it('calls impactAsync with Heavy for impactHeavy', async () => {
    await triggerHaptic('impactHeavy');
    expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Heavy);
  });
});

// ─── Notification haptics ─────────────────────────────────────────────────────

describe('triggerHaptic — notification types', () => {
  it('calls notificationAsync with Success for notificationSuccess', async () => {
    await triggerHaptic('notificationSuccess');
    expect(Haptics.notificationAsync).toHaveBeenCalledWith(
      Haptics.NotificationFeedbackType.Success,
    );
    expect(Haptics.impactAsync).not.toHaveBeenCalled();
  });

  it('calls notificationAsync with Warning for notificationWarning', async () => {
    await triggerHaptic('notificationWarning');
    expect(Haptics.notificationAsync).toHaveBeenCalledWith(
      Haptics.NotificationFeedbackType.Warning,
    );
  });

  it('calls notificationAsync with Error for notificationError', async () => {
    await triggerHaptic('notificationError');
    expect(Haptics.notificationAsync).toHaveBeenCalledWith(
      Haptics.NotificationFeedbackType.Error,
    );
  });
});

// ─── Selection haptic ─────────────────────────────────────────────────────────

describe('triggerHaptic — selection', () => {
  it('calls selectionAsync for selection', async () => {
    await triggerHaptic('selection');
    expect(Haptics.selectionAsync).toHaveBeenCalled();
    expect(Haptics.impactAsync).not.toHaveBeenCalled();
    expect(Haptics.notificationAsync).not.toHaveBeenCalled();
  });
});

// ─── Web platform: no-op ─────────────────────────────────────────────────────

describe('triggerHaptic — web platform', () => {
  it('does not call any haptics method when Platform.OS is "web"', async () => {
    Object.defineProperty(Platform, 'OS', { get: () => 'web', configurable: true });
    await triggerHaptic('impactLight');
    expect(Haptics.impactAsync).not.toHaveBeenCalled();
    expect(Haptics.notificationAsync).not.toHaveBeenCalled();
    expect(Haptics.selectionAsync).not.toHaveBeenCalled();
  });
});

// ─── Resilience: expo-haptics throws ─────────────────────────────────────────

describe('triggerHaptic — resilience', () => {
  it('does not throw when expo-haptics impactAsync throws', async () => {
    Haptics.impactAsync.mockRejectedValueOnce(new Error('haptic failure'));
    await expect(triggerHaptic('impactLight')).resolves.toBeUndefined();
  });

  it('does not throw when expo-haptics notificationAsync throws', async () => {
    Haptics.notificationAsync.mockRejectedValueOnce(new Error('haptic failure'));
    await expect(triggerHaptic('notificationSuccess')).resolves.toBeUndefined();
  });

  it('does not throw when expo-haptics selectionAsync throws', async () => {
    Haptics.selectionAsync.mockRejectedValueOnce(new Error('haptic failure'));
    await expect(triggerHaptic('selection')).resolves.toBeUndefined();
  });
});
