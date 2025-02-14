Biddist is a sample project (still in progress)for an auction site, 
using Stripe for payments, Mailgun for 2FA, Github Actions for CI/CD,
and Husky for pre-commit hooks. The project will use event driven architecture 
to handle real-time updates properly, using MongoDB change streams and 
Server Sent Events to avoid polling.