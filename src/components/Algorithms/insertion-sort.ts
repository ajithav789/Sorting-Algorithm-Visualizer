import { waitforme } from "./common-methods";

export async function insertion(
    visualization_speed,
    comparison_color,
    bar_color,
    sorted_color
  ) {
    console.log("In insertion()");
    const ele = document.querySelectorAll(".bar") as any;
    // color
    ele[0].style.background = sorted_color;
    for (let i = 1; i < ele.length; i++) {
      let j = i - 1;
      let key = ele[i].style.height;
      // color
      ele[i].style.background = comparison_color;
  
      await waitforme(Math.abs(visualization_speed - 100));
  
      while (j >= 0 && parseInt(ele[j].style.height) > parseInt(key)) {
        // color
        ele[j].style.background = comparison_color;
        ele[j + 1].style.height = ele[j].style.height;
        j--;
  
        await waitforme(Math.abs(visualization_speed - 100));
  
        // color
        for (let k = i; k >= 0; k--) {
          ele[k].style.background = sorted_color;
        }
      }
      ele[j + 1].style.height = key;
      // color
      ele[i].style.background = sorted_color;
    }
  }