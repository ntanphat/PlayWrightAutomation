Feature: Ecommerce validations

  @Regression
  Scenario: Placing order
    Given a login to Ecommerce application with "ntphat134@gmail.com" and "1234aaAA"
    When add "ADIDAS ORIGINAL" to Cart
    Then Verify "ADIDAS ORIGINAL" is displayed to the Cart
    When Enter valid details and Place the Order
    Then Verify order in present in the Order History

  @Validation
  Scenario Outline: Placing order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify error message is displayed

    Examples:
      | username               | password |
      | rahulshettyacademy1111 | learning |
      | zzz@gmail.com          | abc@123  |
