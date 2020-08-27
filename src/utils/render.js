import Abstract from "../view/abstract.js";

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const render = (container, child, place = RenderPosition.BEFOREEND) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (child instanceof Abstract) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
  }
};

export const renderTemplate = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const append = (parent, child) => {
  if (parent instanceof Abstract) {
    parent = parent.getElement();
  }

  if (child instanceof Abstract) {
    child = child.getElement();
  }

  if (parent === null || child === null) {
    throw new Error(`Can't append unexisting elements`);
  }


  parent.appendChild(child);
};

export const remove = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};

export const replace = (oldItem, newItem) => {
  if (oldItem instanceof Abstract) {
    oldItem = oldItem.getElement();
  }

  if (newItem instanceof Abstract) {
    newItem = newItem.getElement();
  }

  const parentElement = oldItem.parentElement;

  if (parentElement === null || !oldItem || !newItem) {
    throw new Error(`Can't replace`);
  }

  parentElement.replaceChild(newItem, oldItem);
};
