const pageUrl = "http://127.0.0.1:8080/"

function successfullSubmit(name, email, phone) {
  cy.get("#yourGender").type(gender)
  cy.get("#name").type(name)
  cy.get("#email").type(email)
  cy.get("#phone").type(phone)
  cy.get("#dob").type("1993-10-15")

  cy.contains("button", "Submit").click()
}

describe('Page load and form components', () => {
  beforeEach(() => {
    cy.visit(pageUrl)
  });

  it('display Registration form on load', () => {
    cy.contains("h2", "Registration Form")
  })

  it('shows an empty Registration form on load', () => {
    cy.get('.form-container').should('be.visible')
    cy.get('#infoTable tbody tr').should('have.length', 0);
  })

  it('display submit button on load', () => {
    cy.contains("button", "Submit")
  })

  it('shows empty submitted information table on load', () => {
    cy.get('#infoTable').should('be.visible')
    cy.get("h3").should("have.text", "Submitted Information")
  })

  it('displays table header on load', () => {
    cy.get('th').should('be.visible')
  })
})

describe('Form validation tests', () => {
  const gender = "Female";
  const name = "Raminta";
  const email = "raminta@blabla.com";

  beforeEach(() => {
    cy.visit(pageUrl)
  });

  it('should not allow form submission with empty fields', () => {
    cy.get('button').click();
    cy.on('window:alert', (text) => {
      expect(text).to.equal('Please fill out all fields.');
    });
  });

  it('should display alert when phone number contains non - numeric characters', () => {
    const wrongPhone = 'aaaAAAA++++';

    cy.get("#yourGender").type(gender)
    cy.get("#name").type(name)
    cy.get("#email").type(email)
    cy.get("#phone").clear().type(wrongPhone)
    cy.get("#dob").type("1993-10-15")
    cy.get("button").click()

    cy.on('window:alert', (text) => {
      expect(text).to.equal('Phone number must contain only numbers.');
    });
  });

  it('should highlight row in red if age is less than 18', () => {
    const lessThan18Date = '2009-01-01';
    const phone = "1212121212";
    cy.get("#yourGender").type(gender)
    cy.get('#name').type(name);
    cy.get('#email').type(email);
    cy.get('#phone').clear().type(phone);
    cy.get('#dob').type(lessThan18Date);
    cy.get('button').click();

    cy.get('tbody tr').should('have.class', 'red-background');
  })

  it('should show age as 0, when date of the birth is in the future', () => {
    const dateOfBirthFuture = '2027-01-01';
    const phone = "1212121212";

    cy.get('#name').type(name);
    cy.get('#email').type(email);
    cy.get('#phone').clear().type(phone);
    cy.get('#dob').type(dateOfBirthFuture);
    cy.get('button').click();

    // Patikrinama, ar lentelėje atsirado tekstas "0"
    cy.contains('0').should('be.visible');
  })
})

describe('Form submission tests', () => {
  const name = "Raminta";
  const email = "raminta@blabla.com";
  const phone = "1212121212";

  function successfullSubmit1(name, email, phone) {
    cy.get("#name").type(name)
    cy.get("#email").type(email)
    cy.get("#phone").type(phone)
    cy.get("#dob").type("1993-10-15")

    cy.contains("button", "Submit").click()
  }

  beforeEach(() => {
    cy.visit(pageUrl)
  });

  it('allows to fill and submit data', () => {
    const dateOfBirth1 = "1993-10-15"
    successfullSubmit1(name, email, phone)

    cy.contains("td", name).should('be.visible')
    cy.contains("td", email).should('be.visible')
    cy.contains("td", phone).should('be.visible')
    cy.contains("td", dateOfBirth1).should('be.visible')
  })

  it('should reset the form to empty fields after submitting valid input', () => {
    successfullSubmit1(name, email, phone);

    cy.get('#name').should('have.value', '');
    cy.get('#email').should('have.value', '');
    cy.get('#phone').should('have.value', '');
    cy.get('#dob').should('have.value', '');
  })
})

// pvz:
// it('display submit button on load', () => {
//   yra gali 3 variantai, kai užsirašyti testą.å
//   cy.get("button").should("have.text", "Submit")
//   cy.contains('Submit')
//   cy.contains("button", "Submit")
// // })

// Check that REgistration title is displayed
// Check that form is visible and empty
// The table is visible empty.
// The table contains the data i have sent
// After the sending the registration form gets emptied.
// Edges cases:
// Empty form and alert, Please fill the information
// If you are younger than 18, thel line became red.


