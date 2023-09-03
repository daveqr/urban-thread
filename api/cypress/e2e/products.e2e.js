
// describe('E2E Tests', () => {
//     beforeEach(() => {
//       cy.exec('npm run db:reset');
//     });
  
//     it('should perform a test with MongoDB interactions', () => {
//       cy.visit('/');
  
//       cy.get('button').click();
//       cy.contains('Item added successfully');
  
//       cy.task('seedDatabase');
  
//       cy.wait(1000);
  
//       cy.task('queryDatabase').then((result) => {
//         expect(result).to.exist;
//       });
//     });
//   });
  