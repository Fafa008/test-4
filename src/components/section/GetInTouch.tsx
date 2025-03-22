import React from "react";

const GetInTouch: React.FC = () => {
  return (
    <div className="h-screen w-full bg-purple-500 dark:bg-purple-900 p-8">
      <h1 className="text-white text-6xl text-center mb-12">Get In Touch</h1>

      {/* Card container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {/* Card 1 */}
        <div className="bg-white dark:bg-purple-800 text-purple-500 dark:text-white rounded-lg shadow-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1579546928688-4e9a40e2b7c3"
            alt="Card 1"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold">Card Title 1</h3>
            <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
              A short description of the content in this card. Learn more about
              this topic and its importance.
            </p>
            <button className="mt-6 px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-purple-800 text-purple-500 dark:text-white rounded-lg shadow-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1511681547429-4efdd8f264f1"
            alt="Card 2"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold">Card Title 2</h3>
            <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
              Another short description that highlights key points or features.
              This card will give more insight into the topic.
            </p>
            <button className="mt-6 px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white dark:bg-purple-800 text-purple-500 dark:text-white rounded-lg shadow-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1506748686210-5e877dc730c1"
            alt="Card 3"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold">Card Title 3</h3>
            <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
              Another description about a different topic. A concise explanation
              can be put here with a call to action.
            </p>
            <button className="mt-6 px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white dark:bg-purple-800 text-purple-500 dark:text-white rounded-lg shadow-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1581349480675-2f9e06352e72"
            alt="Card 4"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold">Card Title 4</h3>
            <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
              A description for this card highlighting its unique features.
            </p>
            <button className="mt-6 px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Card 5 */}
        <div className="bg-white dark:bg-purple-800 text-purple-500 dark:text-white rounded-lg shadow-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1533758251470-00a5bb5d2fdb"
            alt="Card 5"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold">Card Title 5</h3>
            <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
              Final card with some useful information. A short description goes
              here.
            </p>
            <button className="mt-6 px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
