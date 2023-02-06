import KanbanAPI from "../api/KanbanAPI.js";
import DropZone from "./DropZone.js";
import Item from "./Item.js";

export default class Column {
  constructor(id, title) {
    const topDropZone = DropZone.createDropZone();

    this.elements = {};
    this.elements.root = Column.createRoot();
    this.elements.title = this.elements.root.querySelector(
      ".kanban__columnTitle"
    );
    this.elements.items = this.elements.root.querySelector(
      ".kanban__columnItems"
    );
    this.elements.addItem =
      this.elements.root.querySelector(".kanban__addItem");

    this.elements.root.dataset.id = id;
    this.elements.title.textContent = title;

    this.elements.items.appendChild(topDropZone);

    this.elements.addItem.addEventListener("click", () => {
      const newItem = KanbanAPI.insertItem(id, "");
      this.renderItem(newItem);
    });
  }

  static createRoot() {
    const range = document.createRange();

    range.selectNode(document.body);

    return range.createContextualFragment(`
            <div class="kanban__column">
                <div class="kanban__columnTitle"></div>
                <div class="kanban__columnItems"></div>
                <button class="kanban__addItem" type="button">+ Add</button>
            </div>
            
        `).children[0];
  }

  renderItem(data) {
    console.log(data.id, data.content);
    const item = new Item(data.id, data.content);
    this.elements.items.appendChild(item.elements.root);
  }
}
