import KanbanAPI from "../api/KanbanAPI";

export default class Item {
  constructor(id, content) {
    this.elements = {};
    this.elements.root = Item.createRoot();
    this.elements.input = this.elements.root.querySelector("kanban__itemInput");
    this.elements.root.dataset.id = id;
    this.elements.input.textContent = content;
    this.content = content;

    const onBlur = () => {
      const newContent = this.elemeents.input.texstContent.trim();

      if (newContent === this.content) {
        return;
      }
      this.content = newContent;

      KanbanAPI.updateItem(id, {
        content: this.content,
      });
    };

    this.elements.input.addEventListener("blur", onBlur);
    this.elements.root.addEventListener("dblclick", () => {
      const check = confirm(
        "Are you sure you want to DELETE this item from your board?"
      );

      if (check) {
        KanbanAPI.deleteItem(id);
        this.elements.input.removeEventListener("blur", onBlur);

        this.elements.root.parentElement.removeChild(this.elements.root);
      }
    });
  }

  static createRoot() {
    const range = document.createRange();

    range.selectNode(document.body);

    return range.createContextualFragment(`
        <div class='kanban__item' draggable='true'>
            <div class='kanban__itemInput' contenteditable></div>
        </div>
    `).children[0];
  }
}