// Framework: Vitest
import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn (clsx + tailwind-merge)', () => {
  it('returns empty string when called with no args', () => {
    expect(cn()).toBe('');
  });

  it('deduplicates identical classes', () => {
    expect(cn('p-2', 'p-2')).toBe('p-2');
    expect(cn('bg-red-500', 'text-white', 'bg-red-500')).toBe('bg-red-500 text-white');
  });

  it('resolves Tailwind conflicts by keeping the last applicable utility', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
    expect(cn('font-semibold', 'font-bold')).toBe('font-bold');
    expect(cn('ring-1', 'ring-2', 'ring-4')).toBe('ring-4');
    expect(cn('ring-offset-1', 'ring-offset-4')).toBe('ring-offset-4');
  });

  it('preserves variants/modifiers and resolves conflicts within same variant scope', () => {
    expect(cn('md:p-2', 'md:p-4')).toBe('md:p-4');
    expect(cn('hover:bg-red-500', 'hover:bg-blue-500')).toBe('hover:bg-blue-500');
    expect(cn('sm:hover:bg-red-500', 'sm:hover:bg-red-500', 'sm:hover:bg-blue-500')).toBe('sm:hover:bg-blue-500');
  });

  it('handles arrays and nesting (clsx compatibility)', () => {
    expect(cn(['p-2', ['m-4', ['text-sm']]])).toBe('p-2 m-4 text-sm');
    expect(cn('p-2', ['p-4'])).toBe('p-4'); // conflict resolved by tailwind-merge
  });

  it('supports object syntax: includes truthy keys and excludes falsy', () => {
    const truthy = true;
    const falsy = false;
    expect(cn({ 'p-2': truthy, 'm-4': falsy, 'text-sm': 1 })).toBe('p-2 text-sm');
  });

  it('ignores null/undefined/false and trims output', () => {
    // @ts-expect-error - runtime should gracefully ignore falsy-like values
    expect(cn(null as any, undefined as any, false as any)).toBe('');
    expect(cn('p-2', undefined as any, null as any, false as any, 'm-1')).toBe('p-2 m-1');
  });

  it('includes numeric tokens (clsx behavior)', () => {
    expect(cn(0 as any, 1 as any, 'p-2')).toBe('0 1 p-2');
  });

  it('does not merge unrelated utilities', () => {
    expect(cn('p-2', 'm-4')).toBe('p-2 m-4');
    expect(cn('bg-red-500', 'text-red-500')).toBe('bg-red-500 text-red-500');
  });

  it('handles long lists with multiple conflicts deterministically', () => {
    const result = cn(
      'p-1 p-2 p-3',
      'm-0 m-2',
      'bg-red-500',
      'bg-green-500',
      'text-xs text-base',
      ['rounded-none', 'rounded-lg'],
      { 'shadow-sm': true, 'shadow-lg': true }
    );
    expect(result).toBe('p-3 m-2 bg-green-500 text-base rounded-lg shadow-lg');
  });

  it('respects important modifier precedence', () => {
    expect(cn('p-2', '!p-4')).toBe('!p-4');
    expect(cn('!p-2', 'p-4')).toBe('p-4');
  });
});