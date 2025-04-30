const features = [
    {
      title: '💬 Real-Time Messaging',
      description: 'Experience blazing fast chats powered by Redis & WebSockets.',
    },
    {
      title: '📦 Scalable Event Handling',
      description: 'Kafka ensures your message delivery and events are decoupled and reliable.',
    },
    {
      title: '🤖 Smart AI Summaries',
      description: 'Auto-generate user-friendly message summaries and delivery updates.',
    },
    {
      title: '📈 Lightweight & Performant',
      description: 'Built with Next.js, Tailwind, and optimized for speed.',
    },
  ];
  
  export default function Features() {
    return (
      <section id="features" className="py-16 px-4 bg-gray-50 dark:bg-[#111]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why ChatNow?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            A real-time chat system that&rsquo;s not just fast — it&apos;s built for scale, clarity, and real-world usage.
          </p>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {features.map((feat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-[#1c1c1c] rounded-xl shadow-sm p-6 text-left hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold mb-2">{feat.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  