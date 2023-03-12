import { beep, swap, waitforme } from "./common-methods";

export async function bubble(
  visualization_speed,
  comparison_color,
  bar_color,
  sorted_color
) {
  const ele = document.querySelectorAll(".bar") as any;
  for (let i = 0; i < ele.length - 1; i++) {
    for (let j = 0; j < ele.length - i - 1; j++) {
      ele[j].style.background = comparison_color;
      ele[j + 1].style.background = comparison_color;
      if (
        parseFloat(ele[j].style.height) < parseFloat(ele[j + 1].style.height)
      ) {
        await waitforme(Math.abs(visualization_speed - 100));
        swap(ele[j], ele[j + 1]);
      }
      ele[j].style.background = bar_color;
      ele[j + 1].style.background = bar_color;
    }
    ele[ele.length - 1 - i].style.background = sorted_color;
    beep(
      40,
      15 * parseFloat(ele[ele.length - 1 - i].style.height),
      0.3,
      "sine"
    );
  }
  ele[0].style.background = sorted_color;
  return true;
}
