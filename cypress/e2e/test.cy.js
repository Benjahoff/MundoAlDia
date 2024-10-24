describe("Prueba de inicio de sesión/ crear noticia ", () => {
  it("Debe visitar el sitio, hacer login con éxito y crear una noticia", () => {
    cy.visit("http://localhost:3000"); 

    cy.contains("Login").should("be.visible");

    cy.get('button[name="loginBtn"]').click();

    cy.get('input[name="loginMail"]').type("testUser@gmail.com");

    cy.get('input[name="loginPass"]').type("12345678");

    cy.get("#loginBtn").click();

    cy.wait(5000);

    cy.contains("LogOut").should("be.visible");
    cy.get(':nth-child(1) > .max-w-lg > .absolute > .bg-yellow-500').click()
    cy.get("#title").clear().type(
      "Internet y el móvil son ya tecnologías esenciales para los ciudadanos de todas las edades"
    );
    cy.get("#subtitle").clear().type(
      "El estudio de la Fundación BBVA revela un aumento en la percepción de internet y el teléfono móvil como tecnologías clave, destacando diferencias generacionales en la valoración de dispositivos como el ordenador personal y la televisión"
    );
    cy.get("#urlImage").clear().type(
      "https://th.bing.com/th/id/OIP.GcdJhWF0aUYdIsVsmRXfgQHaEc?rs=1&pid=ImgDetMain"
    );
    cy.get("#description").clear().type(
      'Madrid, 18 oct (EFE).- Internet y el teléfono móvil se han convertido ya en tecnologías "esenciales" para los ciudadanos de todas las edades, por encima del ordenador personal, un dispositivo que aunque la mayoría lo considera útil, son muchos, sobre todo las personas mayores, los que lo perciben como prescindible. La transformación digital que se ha registrado durante la última década ha modificado sustancialmente la percepción que los ciudadanos tienen de las diferentes tecnologías, según pone de relieve un estudio elaborado por la Fundación BBVA en dieciocho países europeos -entre ellos España- y en tres más con perfiles muy diferentes: Estados Unidos, Israel y Turquía,Se trata de la tercera parte del Estudio de Cultura Científica de la Fundación BBVA, y en este caso recopila la percepción de los ciudadanos sobre algunas de las principales tecnologías presentes en la vida cotidiana y la importancia que le otorgan a cada una de ellas y cómo ha evolucionado esa percepción durante los últimos años.', { delay: 0 }
    );

    cy.get("#btnCreate").click();
  });
});

