import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/ja";

// プラグインを拡張
dayjs.extend(utc);
dayjs.extend(timezone);

// 日本語ロケールを設定
dayjs.locale("ja");

export const useDayjs = (): dayjs.Dayjs => {
  return dayjs();
};
