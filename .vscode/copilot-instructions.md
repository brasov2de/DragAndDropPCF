# Instructions for TypeScript PCF Project

The terminal won't understand "&&" commands, so write them in separately lines.

## Prerequisites

- Node.js (LTS version recommended)
- npm (comes with Node.js)
- Power Platform CLI (`pac`)
- Visual Studio Code (recommended)
- TypeScript

## Setup

1. **Install Power Platform CLI:**
    ```
    npm install -g pac
    ```

2. **Create a new PCF project:**
    ```
    pac pcf init --namespace <yourNamespace> --name <yourControlName> --template field
    ```

3. **Navigate to the project folder:**
    ```
    cd <yourControlName>
    ```

4. **Install dependencies:**
    ```
    npm install
    ```

5. **Build the project:**
    ```
    npm run build
    ```

6. **Test locally:**
    ```
    npm start
    ```

## Development

- Source code is in the `src` folder.
- Main control logic is in `index.ts`.
- Update `ControlManifest.Input.xml` for control metadata and properties.

## Packaging

1. **Build the control:**
    ```
    npm run build
    ```

2. **Create solution project:**    
    Create a solution subfolder named like the project and add "Solution" to the name, e.g., `<MyControl>Solution`. 
    Open the terminal in this folder. 
    ```
    pac solution init --publisher-name <publisherName> --publisher-prefix <prefix>
    pac solution add-reference --path ..\
    ```
    In the generated cdsproj file, add the property group "<SolutionPackageType>Both</SolutionPackageType>".
    

3. **Build the solution:**
    Increment the PCF and solution version using. 
    ```    
    pac solution version --strategy solution    
    pac pcf version --stategy manifest        
    ```

    Build the bundle in production mode, after moving back to the solution folder:
    ```
    dotnet build --configuration Release
    ```

## Deployment

- Import the generated solution `.zip` file into your Power Platform environment.

## Useful Commands

- `npm run build` - Build the control
- `npm start` - Run test harness
- `npm run lint` - Lint TypeScript code

## References

- [PCF Documentation](https://learn.microsoft.com/power-apps/developer/component-framework/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)