import { convertAddressToShortString, id } from "../../../utils";
import * as styles from "../styling";
import { copy } from "../media/img";

export const UserOverview = (
  account: string,
  destination: string,
  chainId: number,
): HTMLElement => {
  const tableContainer = document.createElement("div");
  tableContainer.style.width = "100%";
  Object.assign(
    tableContainer.style,
    styles.flexCenter,
    styles.padding5,
    styles.actionContainerStyle,
  );

  const table = document.createElement("table");
  table.style.minWidth = "70%";
  table.style.borderCollapse = "collapse"; // To remove spacing between table cells

  // add styling
  Object.assign(
    table.style,
    styles.brandNameSecondLine,
    styles.textAlignLeft,
    styles.fontLight,
  );
  const rows = [
    { label: "Your account", value: account },
    { label: "Destination", value: destination },
    { label: "Chain id", value: chainId.toString() },
  ];

  rows.forEach((rowInfo, index) => {
    const row = document.createElement("tr");

    const labelCell = document.createElement("td");
    labelCell.textContent = rowInfo.label;
    labelCell.style.padding = "2px";

    const valueCell = document.createElement("td");
    const valueText = convertAddressToShortString(rowInfo.value);
    valueCell.style.padding = "2px";

    if (valueText.includes("0x")) {
      // Only add copy-to-clipboard functionality if value contains "0x"
      const valueSpan = document.createElement("span");

      // Create an SVG element (adjust attributes as needed)
      const svgElement = new DOMParser()
        .parseFromString(copy, "image/svg+xml")
        .querySelector("svg");

      svgElement!.setAttribute("width", "10");
      svgElement!.setAttribute("height", "10");

      Object.assign(svgElement!.style, styles.pointer);
      // add id
      svgElement!.id = id("address-" + index);
      svgElement!.style.marginTop = "3px";

      const textSpan = document.createElement("span");
      textSpan.textContent = valueText;
      textSpan.style.marginRight = "3px";

      textSpan.style.cursor = "pointer";

      valueSpan.appendChild(textSpan);
      valueSpan.appendChild(svgElement!);

      valueCell.appendChild(valueSpan);
    } else {
      // If value doesn't contain "0x", just display it without copy functionality
      valueCell.textContent = valueText;
    }

    row.appendChild(labelCell);
    row.appendChild(valueCell);

    table.appendChild(row);
  });

  tableContainer.appendChild(table);

  return tableContainer;
};
