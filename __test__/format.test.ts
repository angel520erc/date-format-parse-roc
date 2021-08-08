import moment from 'moment';
import { format } from '../src/format';
import { parse } from '../src/parse';
import zhCN from '../src/locale/zh-cn';

it('format full', () => {
  const date = new Date(2019, 5, 9, 6, 6, 9, 1);
  const fmt = 'YYYY-MM-DD HH:mm:ss.SSS';
  const dateString = format(date, fmt);
  expect(dateString).toBe(moment(date).format(fmt));
  expect(parse(dateString, fmt)).toEqual(date);
});

it('format short', () => {
  const date = new Date(2019, 5, 9, 6, 6, 9, 0);
  const fmt = 'YY-M-D H:m:s.S SS';
  const dateString = format(date, fmt);
  expect(dateString).toBe(moment(date).format(fmt));
  expect(parse(dateString, fmt)).toEqual(date);
});

it('format year < 0', () => {
  const date = new Date();
  date.setFullYear(-53, 0);
  const fmt = 'Y';
  const dateString = format(date, fmt);
  expect(dateString).toBe(moment(date).format(fmt));
  expect(parse(dateString, fmt).getFullYear()).toBe(date.getFullYear());
});

it('format year < 100', () => {
  const date = new Date(2019, 0);
  date.setFullYear(50);
  const fmt = 'YYYY';
  const dateString = format(date, fmt);
  expect(dateString).toBe(moment(date).format(fmt));
  expect(parse(dateString, fmt).getFullYear()).toBe(date.getFullYear());
});

it('format 12h', () => {
  const dates = [
    new Date(2019, 10, 9, 18, 6, 9), // hour > 12
    new Date(2019, 10, 9, 12, 6, 9), // hour = 12
    new Date(2019, 10, 9, 0, 6, 9), // hour = 0
    new Date(2019, 10, 9, 6, 6, 9), // hour < 12
  ];
  dates.forEach(date => {
    let fmt = 'YYYY-MM-DD hh:mm:ss a';
    let dateString = format(date, fmt);
    expect(dateString).toBe(moment(date).format(fmt));
    expect(parse(dateString, fmt)).toEqual(date);
    fmt = 'YYYY-MM-DD hh:mm:ss A';
    dateString = format(date, fmt);
    expect(dateString).toBe(moment(date).format(fmt));
    expect(parse(dateString, fmt)).toEqual(date);
  });
});

it('format long month', () => {
  const arr = ['MMM', 'MMMM'];
  arr.forEach(month => {
    const date = new Date(2019, 10, 6);
    const fmt = `YYYY-${month}-DD`;
    const dateString = format(date, fmt);
    expect(dateString).toBe(moment(date).format(fmt));
    expect(parse(dateString, fmt)).toEqual(date);
  });
});

it('format week', () => {
  const arr = ['d', 'dd', 'ddd', 'dddd'];
  arr.forEach(week => {
    const date = new Date(2019, 10, 6);
    const fmt = `YYYY-MM-DD ${week}`;
    const dateString = format(date, fmt);
    expect(dateString).toBe(moment(date).format(fmt));
    expect(parse(dateString, fmt)).toEqual(date);
  });
});

it('format timezone', () => {
  const arr = ['Z', 'ZZ'];
  arr.forEach(v => {
    const date = new Date(2019, 10, 6, 10, 6, 5);
    const fmt = `YYYY-MM-DD HH:mm:ss ${v}`;
    const dateString = format(date, fmt);
    expect(dateString).toBe(moment(date).format(fmt));
    expect(parse(dateString, fmt)).toEqual(date);
  });
});

it('format timestamp', () => {
  const arr = ['x', 'X'];
  arr.forEach(v => {
    const date = new Date(2019, 10, 6, 10, 6, 5);
    const fmt = v;
    const dateString = format(date, fmt);
    expect(dateString).toBe(moment(date).format(fmt));
    expect(parse(dateString, fmt)).toEqual(date);
  });
});

it('format week', () => {
  const arr = ['w', 'ww'];
  const dates = [new Date(2019, 0, 6), new Date(2019, 0, 1), new Date(2018, 11, 29)];
  arr.forEach(fmt => {
    dates.forEach(date => {
      const dateString = format(date, fmt);
      expect(dateString).toBe(moment(date).format(fmt));
    });
  });
});

it('format escape', () => {
  const date = new Date(2019, 10, 6, 10, 6, 5);
  const fmt = 'YYYY-MM-DD [at MM] HH:mm:ss';
  const dateString = format(date, fmt);
  expect(dateString).toBe(moment(date).format(fmt));
  expect(parse(dateString, fmt)).toEqual(date);
});

it('locale', () => {
  const date = new Date(2019, 10, 2, 18, 5, 2);
  const fmt = 'YYYY年 MMM DD日 hh:mm:ss a';
  const dateString = format(date, fmt, { locale: zhCN });
  expect(dateString).toBe('2019年 11月 02日 06:05:02 下午');
  expect(parse(dateString, fmt, { locale: zhCN })).toEqual(date);
});

it('invalid date', () => {
  const date = new Date(NaN);
  const fmt = 'YYYY';
  expect(format(date, fmt)).toBe('Invalid Date');
});
