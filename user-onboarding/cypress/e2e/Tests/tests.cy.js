describe("Form Test", ()=>{
    beforeEach(()=>{
        cy.visit("http://localhost:3000")
    })

    const fnameInput=()=>cy.get("input[name=fname]")
    const lnameInput=()=>cy.get("input[name=lname]")
    const emailInput=()=>cy.get("input[name=email]")
    const passwordInput=()=>cy.get("input[name=password]")
    const termsInput=()=>cy.get("input[name=terms]")
    const submitBtn = ()=> cy.get(`button[id=submitBtn]`)
    const errorLog =()=> cy.get("h6[id=error-log]")

    it("sanity check for test software", ()=>{
        expect(true).to.equal(true)
        expect(1+1).to.equal(2)
    })

    it("tests to check if elements exist", ()=>{
        fnameInput().should("exist");
        lnameInput().should("exist");
        emailInput().should("exist");
        passwordInput().should("exist");
        termsInput().should("exist");
        submitBtn().should("exist");
        cy.contains(/submit info/i).should("exist")
        errorLog().should("exist")
    })

    describe("Filling out inputs tests", ()=>{
        it("site navigation test", ()=>{
            cy.url().should("include","localhost")
        })

        it("submit button starts out disabled", ()=>{
            submitBtn().should("be.disabled");
        })

        it("changing inputs, form validation, and error logging test", ()=>{
            fnameInput()
                .should("have.value","")
                .type("John")
                .should("have.value","John")
            lnameInput()
                .should("have.value","")
                .type("Abdou")
                .should("have.value","Abdou")
            emailInput()
                .should("have.value","")
                .type("johnabdou@hotmail.com")
                .should("have.value","johnabdou@hotmail.com")   
            passwordInput()
                .should("have.value","")
                .type("testP")
                .should("have.value", "testP")
            errorLog()
                .should("contain","short")
            passwordInput()
                .type("ass1")
                .should("have.value", "testPass1")
            termsInput()
                .should('not.be.checked')
                .check()
                .should('be.checked')
            submitBtn()
                .should("not.be.disabled")
            termsInput()
                .uncheck()
            submitBtn()
                .should("be.disabled")
            errorLog().should("contain","You must agree to the terms & conditions")
            passwordInput()
                .clear()
            errorLog()
                .should("contain", "Password required")
            emailInput()
                .clear()
            errorLog()
                .should("contain", "Email")            
            lnameInput()
                .clear()
            errorLog()
                .should("contain", "Last name")
            fnameInput()
                .clear()
            errorLog()
                .should("contain", "First name")
            
                       
        })


    })
    describe("Form submission and entry display test",()=>{
        it("Form filling and submission test", ()=> {
            fnameInput()
                .type("John")
            lnameInput()
                .type("Abdou")
            emailInput()
                .type("johnabdou@hotmail.com")
            passwordInput()
                .type("testPass1")
            termsInput()
                .check()
            submitBtn()
                .click()
            cy.get("pre[id=entries-log]").contains("fname")
        })
    })
})
