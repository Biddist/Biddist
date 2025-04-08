Biddist is an in-progress (as of writing) cloud native auction Web App, 
using Stripe for payments, Mailtrap for 2FA, Github Actions for CI/CD,
and Husky for pre-commit hooks. The project will use event driven architecture 
to handle real-time updates properly, using MongoDB change streams and 
Server Sent Events to avoid polling.