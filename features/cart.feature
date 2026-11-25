Feature: Shopping cart
  As a shopper on Toolshop
  I want to add products to my cart
  So that I can buy them together at checkout

  Background:
    Given I am on the Toolshop home page
    And my cart is empty

  Example: Add one product to the cart
    When I open the "Combination Pliers" product page
    And I add it to my cart
    Then I see the message "Product added to shopping cart."
    And the cart icon shows 1 item

  Example: Add several of the same product
    When I open the "Combination Pliers" product page
    And I set the quantity to 3
    And I add it to my cart
    Then my cart shows "Combination Pliers" with a quantity of 3
    And the cart total is $42.45

  Example: Change the quantity in the cart
    Given I have added 1 "Combination Pliers" to my cart
    When I open my cart
    And I change the quantity of "Combination Pliers" to 2
    Then the cart total is $28.30

  Example: Remove a product from the cart
    Given I have added 1 "Combination Pliers" to my cart
    When I open my cart
    And I remove "Combination Pliers"
    Then my cart is empty
