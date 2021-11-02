const elements = {
  id: "1",
  children: [
    {
      id: "1_1",
      children: [
        {
          id: "1_1_1",
        },
        {
          id: "1_1_2",
        },
      ],
    },
    {
      id: "1_2",
      children: [
        {
          id: "1_2_1",
        },
      ],
    },
    {
      id: "1_3",
      children: [
        {
          id: "1_3_1",
          children: [
            {
              id: "1_3_1_1",
            },
          ],
        },
      ],
    },
  ],
};

const createElements = (root, children) => {
  const node = document.createElement("div");
  node.id = children.id;
  node.style.width = "100%";
  node.style.minHeight = "600px";
  node.style.backgroundColor = randomRgb();
  node.style.padding = "10px";
  node.innerText = `node-${children.id}`;
  root.appendChild(node);
  if (children.children) {
    children.children.forEach((child) => {
      createElements(node, child);
    });
  }
};

const randomRgb = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const a = 0.5;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

const root = document.querySelector("#root");

createElements(root, elements);

const scrollToElementId = (id) => {
  const element = document.getElementById(id);
  element.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const scrollToBottom = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
};

const scrollToMiddleButton = document.querySelector("#scrollToMiddle");

scrollToMiddleButton.addEventListener("click", () => {
  scrollToElementId("1_2_1");
});

const scrollToMiddleBottomButton = document.querySelector(
  "#scrollToMiddleBottom"
);

scrollToMiddleBottomButton.addEventListener("click", () => {
  scrollToElementId("1_3");
});

const scrollToTopButton = document.querySelector("#scrollToTop");

scrollToTopButton.addEventListener("click", () => {
  scrollToTop();
});

const scrollToBottomButton = document.querySelector("#scrollToBottom");

scrollToBottomButton.addEventListener("click", () => {
  scrollToBottom();
});
