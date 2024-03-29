See the live project at [https://world-clock-nu.vercel.app/](https://world-clock-nu.vercel.app/)

# Project Purpose and Goal

I wanted to create a React app from a design file to practice implementing a full design system with design tokens. I had previously created several marketing webpages based on Figma designs, but these were not interactive or dynamic.

I decided to use the [Clock App Figma file from FrontendMentor.io](https://www.frontendmentor.io/challenges/clock-app-LMFaxFwrM). The designs included the layouts for mobile, tablet, and desktop sites.

My final product went beyond the original design by allowing location changes via the [GeoDB Cities API](https://rapidapi.com/wirefreethought/api/geodb-cities/details) for searching new locales, and [Weather API](https://www.weatherapi.com/) for updated timezone and weather details based on the chosen location.

# Main Challenge:

## Integrating the GeoDB Cities API

When looking for an API for the city location search, I found the GeoDB API that was ideal in its functionality, but lacking in two main areas:

### 1. Poor documentation

The documentation for the API was not very clear or complete. The best way for me to understand how it worked was to look at the API author’s sample Angular app, whose code was available on GitHub.

#### Solution

I used ChatGPT to decipher and translate much of that sample Angular code into what eventually became my Location Search component.

### 2. Unsecured Endpoint throwing a Mixed Content Warning

I could not access the API through my app’s front end due to the endpoint being unsecured.

#### Solution

Next.js v13+ API routes allowed me to set up a convenient back end route that could access the endpoint and securely pass data to my front end code.

The setup was similar to my previous experience setting up an Express.js backend for my translation app, but more convenient as it is co-located within the Next.js project.

# Lessons Learned

## Following a design removes decision friction and greatly improves execution speed

Starting this project from a Figma design made the process much smoother and quicker to get an MVP up and running. Once the basic designed components were in place, I was able to iterate and modify according to my own tastes, such as adding transitions and experimenting with new APIs used to populate the app’s data - aspects which were not included in the starting designs.
