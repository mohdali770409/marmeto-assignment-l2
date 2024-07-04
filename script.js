const API_URL =
  "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json";
let selectedButton = "Men";
const fetchData = async () => {
  try {
    const res = await fetch(API_URL);
    if (res) {
      const { categories } = await res.json();

      categories.forEach((category, ind) => {
        document.querySelector(`.btn${ind + 1}`).innerHTML =
          category.category_name;
      });
      console.log(selectedButton);

      const category = categories.filter(
        (category) => category.category_name === selectedButton
      );
      const { category_products } = category[0];
      console.log(category_products);

      const products = document.querySelectorAll(".product-box");
      let count = 0;
      products.forEach((product, ind) => {
        product.querySelector(".product-name").textContent = category_products[
          ind
        ].title.slice(0, 12);
        product.querySelector(".discounted-price").textContent =
          category_products[ind].price;
        product.querySelector(".original-price").textContent =
          category_products[ind].compare_at_price;
        const price = parseInt(category_products[ind].price);
        const compareAtPrice = parseInt(
          category_products[ind].compare_at_price
        );

        const off_percentage = Math.ceil(
          ((compareAtPrice - price) / compareAtPrice) * 100
        );
        product.querySelector(
          ".offer-percentage"
        ).textContent = `${off_percentage}%`;

        product.querySelector(".product-image").src =
          category_products[ind].image;

        const badgeTextElement = product.querySelector(".badge-text");
        product.querySelector(".product-brand").textContent =
          category_products[ind].vendor;
        if (badgeTextElement) {
          if (category_products[ind].badge_text !== null) {
            badgeTextElement.innerHTML = category_products[ind].badge_text;
            badgeTextElement.classList.add("badge-text");
          } else {
            badgeTextElement.classList.remove("badge-text");
          }
        } else {
          console.warn("Element with class .badge-text not found.");
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};
fetchData();

const categorySelector = (btn) => {
  if (
    btn !== "btn1" &&
    document.querySelector(".btn1").classList.contains("clicked-property")
  ) {
    document.querySelector(".btn1").classList.remove("clicked-property");
  }
  if (
    btn !== "btn2" &&
    document.querySelector(".btn2").classList.contains("clicked-property")
  ) {
    document.querySelector(".btn2").classList.remove("clicked-property");
  }
  if (
    btn !== "btn3" &&
    document.querySelector(".btn3").classList.contains("clicked-property")
  ) {
    document.querySelector(".btn3").classList.remove("clicked-property");
  }
  const ele = document.querySelector(`.${btn}`).classList;
  if (ele.contains("clicked-property")) {
    return;
  } else {
    if (btn === "btn1") selectedButton = "Men";
    else if (btn === "btn2") selectedButton = "Women";
    else selectedButton = "Kids";
    ele.add("clicked-property");

    fetchData();
  }
};

document.querySelector(".btn1").addEventListener("click", () => {
  categorySelector("btn1");
});
document.querySelector(".btn2").addEventListener("click", () => {
  categorySelector("btn2");
});
document.querySelector(".btn3").addEventListener("click", () => {
  categorySelector("btn3");
});

console.log(selectedButton);
