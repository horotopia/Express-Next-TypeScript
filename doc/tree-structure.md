/project-root
│── /server # Backend Express.js
│   │── /application  # Cas d'utilisation (Use Cases)
│   │   │── /use-cases
│   │   │   │── loginUserUseCase.ts 
│   │   │   │── registerUserUseCase.ts 
│   │── /domain  # Entités et interfaces (Enterprise Business Rules)
│   │   │── /entities
│   │   │   │── user.ts
│   │   │── /repositories
│   │   │   │── userRepositoryInterface.ts
│   │   │── /services  # Interfaces des services métier
│   │   │   │── encryptionServiceInterface.ts
│   │   │   │── emailServiceInterface.ts
│   │   │   │── passwordServiceInterface.ts
│   │   │   │── tokenServiceInterface.ts
│   │   │   │── validationServiceInterface.ts 
│   │   │── /controllers  # Interfaces des Contrôleurs
│   │   │   │── loginAuthenticationControllerInterface.ts
│   │   │   │── registerAuthenticationControllerInterface.ts
│   │   │── /errors  # Erreurs métier
│   │   │   │── userAlreadyExistsError.ts
│   │   │   │── invalidEmailError.ts
│   │   │── /value-objects  # Objets sans identité
│   │   │   │── role-user.enum.ts
│   │── /infrastructure  # Implémentations techniques
│   │   │── /repositories
│   │   │   │── /in-memory
│   │   │   │   │── userRepositoryInMemory.ts (implémente IUserRepository)
│   │   │   │── /sequilize # Implémentation Sequelize pour la base de données PostgreSQL
│   │   │   │   │── /models
│   │   │   │   │   │── userModel.ts
│   │   │   │   │── /repositories
│   │   │   │   │   │── userRepository.ts (implémente IUserRepository)
│   │   │── /services
│   │   │   │── encryptionService.ts (implémente IEncryptionService) # Service utilisant bcrypt
│   │   │   │── emailService.ts (implémente IEmailService) # Service d’envoi d’email
│   │   │   │── passwordService.ts (implémente IPasswordService) # Service de gestion des mots de passe
│   │   │   │── tokenService.ts (implémente ITokenService) # Service de gestion des tokens
│   │   │   │── validationService.ts (implémente IValidationService) # Service de validation des données
│   │   │── /errors  # Erreurs liées à l’infrastructure
│   │   │   │── databaseConnectionError.ts
│   │── /interface
│   │   │── /express
│   │   │   │── /configs
│   │   │   │   │── cors.ts
│   │   │   │   │── helmet.ts
│   │   │   │   │── index.ts
│   │   │   │   │── logger.ts
│   │   │   │── /controllers
│   │   │   │   │── login-authentication.controller.ts (implémente loginAuthenticationControllerInterface)
│   │   │   │   │── register-authentication.controller.ts (implémente registerAuthenticationControllerInterface)
│   │   │   │── /middlewares
│   │   │   │   │── error-handler.ts
│   │   │   │   │── request-logger.ts # Middleware de journalisation des requêtes
│   │   │   │   │── validate-request.ts # Middleware de validation des requêtes
│   │   │   │── /routes
│   │   │   │   │── index.ts
│   │   │   │   │── authentication.routes.ts # Routes d'authentification (login, register)
│   │   │   │── /errors  # Erreurs spécifiques à l'interface HTTP
│   │   │   │   │── statusError.ts # Classe abstraite pour les erreurs HTTP contenant un code de statut
│   │   │   │   │── badRequestError.ts
│   │   │   │   │── unauthorizedError.ts
│   │   │   │   │── notFoundError.ts
│   │   │   │   │── internalServerError.ts
│   │   │   │   │── forbiddenError.ts
│   │   │   │   │── conflictError.ts
│   │   │   │── /server.ts  # Point d’entrée de l’application
│   │   │── /tests  # Tests unitaires et d’intégration
│   │   │   │── /application
│   │   │   │   │── loginUserUseCase.test.ts
│   │   │   │   │── registerUserUseCase.test.ts
│   │   │   │── /domain
│   │   │   │   │── User.test.ts
│   │   │   │── /infrastructure
│   │   │   │   │── /repositories
│   │   │   │   │   │── /in-memory
│   │   │   │   │   │   │── UserRepositoryInMemory.test.ts
│   │   │   │   │   │── /sequilize
│   │   │   │   │   │   │── UserRepositorySequilize.test.ts
│   │   │   │   │   │── /models
│   │   │   │   │   │   │── UserModel.test.ts
│   │   │   │   │   │── /services
│   │   │   │   │   │   │── EncryptionService.test.ts
│   │   │   │   │   │   │── EmailService.test.ts
│   │   │   │── /interface
│   │   │   │   │── /express
│   │   │   │   │   │── /controllers
│   │   │   │   │   │   │── login-authentication.controller.test.ts
│   │   │   │   │   │   │── register-authentication.controller.test.ts
│   │   │   │   │   │── /middlewares
│   │   │   │   │   │   │── error-handler.test.ts
│   │   │   │   │   │   │── request-logger.test.ts
│   │   │   │   │   │   │── validate-request.test.ts
│   │   │   │   │   │── /routes
│   │   │   │   │   │   │── authentication.routes.test.ts
│   │   │   │   │   │── /errors
│   │   │   │   │   │   │── BadRequestError.test.ts
│   │   │   │   │   │   │── UnauthorizedError.test.ts
│   │   │── index.ts  # Point d’entrée de l’infrastructure
│   │   │── package.json
│   │   │── tsconfig.json
│   │   │── eslint.config.mjs
│── /client  # 🌍 Client Next.js (Frontend)
│   │── /src
│   │   │── /components  # Composants réutilisables
│   │   │   │── /ui
│   │   │   │   │── Button.tsx
│   │   │   │   │── Input.tsx
│   │   │   │── Navbar.tsx
│   │   │   │── Footer.tsx
│   │   │── /layouts  # Layouts globaux
│   │   │   │── MainLayout.tsx
│   │   │── /pages  # Pages Next.js (routes)
│   │   │   │── /auth
│   │   │   │   │── login.tsx
│   │   │   │   │── register.tsx
│   │   │   │── /dashboard
│   │   │   │   │── index.tsx
│   │   │   │── /profile
│   │   │   │   │── [id].tsx
│   │   │   │── _app.tsx
│   │   │   │── _document.tsx
│   │   │   │── index.tsx
│   │   │── /hooks  # Hooks React personnalisés
│   │   │   │── useAuth.ts
│   │   │   │── useTheme.ts
│   │   │── /context  # Context API (Auth, Theme)
│   │   │   │── AuthContext.tsx
│   │   │   │── ThemeContext.tsx
│   │   │── /utils  # Fonctions utilitaires
│   │   │   │── formatDate.ts
│   │   │   │── fetcher.ts
│   │   │── /services  # Gestion des appels API côté client
│   │   │   │── authService.ts
│   │   │   │── userService.ts
│   │   │── /lib  # Librairies et configurations
│   │   │   │── axios.ts
│   │   │── /styles  # CSS et Tailwind
│   │   │   │── globals.css
│   │   │   │── tailwind.css
│   │   │── /middleware  # Middlewares Next.js
│   │   │   │── authMiddleware.ts
│   │   │── /types  # Définition des types TypeScript
│   │   │   │── user.ts
│   │   │   │── auth.ts
│   │   │── /config  # Configuration globale
│   │   │   │── AppConfig.ts
│   │   │   │── EnvConfig.ts
│   │   │   │── environmentType.ts
│   │   │── /tests  # Tests unitaires et d'intégration
│   │   │   │── /components
│   │   │   │   │── Button.test.tsx
│   │   │   │── /hooks
│   │   │   │   │── useAuth.test.ts
│   │   │── /store  # State management (Zustand, Redux)
│   │   │   │── authStore.ts
│── .gitignore
│── /scripts  # Scripts pour automatisation
│── /docker  # Configuration Docker si nécessaire
│── .env  # Variables d'environnement
│── package.json
│── tsconfig.json
│── README.md