import { swap, waitforme } from "./common-methods";

export async function selection(
  visualization_speed,
  comparison_color,
  bar_color,
  sorted_color
) {
  const ele = document.querySelectorAll(".bar") as any;
  for (let i = 0; i < ele.length; i++) {
    console.log("In ith loop");
    let min_index = i;
    // Change color of the position to swap with the next min
    ele[i].style.background = "blue";
    for (let j = i + 1; j < ele.length; j++) {
      console.log("In jth loop");
      // Change color for the current comparision (in consideration for min_index)
      ele[j].style.background = "red";

      await waitforme(Math.abs(visualization_speed - 100));
      if (
        parseInt(ele[j].style.height) < parseInt(ele[min_index].style.height)
      ) {
        console.log("In if condition height comparision");
        if (min_index !== i) {
          // new min_index is found so change prev min_index color back to normal
          ele[min_index].style.background = "cyan";
        }
        min_index = j;
      } else {
        // if the currnent comparision is more than min_index change is back to normal
        ele[j].style.background = "cyan";
      }
    }
    await waitforme(Math.abs(visualization_speed - 100));
    swap(ele[min_index], ele[i]);
    // change the min element index back to normal as it is swapped
    ele[min_index].style.background = "cyan";
    // change the sorted elements color to green
    ele[i].style.background = "green";
  }
}
