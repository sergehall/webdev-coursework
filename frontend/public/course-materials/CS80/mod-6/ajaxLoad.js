$(document).ready(function () {
  // Function to display the nutrition data
  function displayNutrition(data) {
    const facts = data.nutritionFacts;
    const listItems = [
      `Product: ${facts.productName}`,
      `Serving Size: ${facts.servingSize}`,
      `Calories: ${facts.calories.totalCalories}`,
      `Calories from Fat: ${facts.calories.fromFat}`,
      `Total Fat: ${facts.fat.totalFat.value} ${facts.fat.totalFat.unit}`,
      `Saturated Fat: ${facts.fat.saturatedFat.value} ${facts.fat.saturatedFat.unit}`,
      `Cholesterol: ${facts.cholesterol.value} ${facts.cholesterol.unit}`,
      `Sodium: ${facts.sodium.value} ${facts.sodium.unit}`,
      `Total Carbs: ${facts.carbohydrates.totalCarbs.value} ${facts.carbohydrates.totalCarbs.unit}`,
      `Fiber: ${facts.carbohydrates.fiber.value} ${facts.carbohydrates.fiber.unit}`,
      `Sugars: ${facts.carbohydrates.sugars.value} ${facts.carbohydrates.sugars.unit}`,
      `Protein: ${facts.protein.value} ${facts.protein.unit}`,
    ];

    const $output = $("#output");
    $output.empty();
    listItems.forEach((item) => {
      $output.append(`<li>${item}</li>`);
    });
  }

  // Load data on page load
  $.ajax({
    url: "data.json",
    method: "GET",
    dataType: "json",
    success: function (data) {
      displayNutrition(data);
    },
    error: function () {
      $("#output").html("<li>Error: could not load data automatically.</li>");
    },
  });

  // Reload on button click
  $("#loadDataBtn").click(function () {
    $.ajax({
      url: "data.json",
      method: "GET",
      dataType: "json",
      success: function (data) {
        displayNutrition(data);
      },
      error: function () {
        $("#output").html(
          "<li>Error: could not load data on button click.</li>"
        );
      },
    });
  });
});
