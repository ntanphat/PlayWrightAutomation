Feature: Ecommerce validations

  @Validation
  Scenario Outline: Placing order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify error message is displayed

    Examples:
    |username               |password  |
    |rahulshettyacademy1111 | learning |
    |zzz@gmail.com          | abc@123  |
