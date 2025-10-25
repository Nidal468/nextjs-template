"use client"
import { motion } from "framer-motion";
import { FaBookOpen, FaSearch, FaHeart, FaStar } from "react-icons/fa";
import { FiArrowDown } from "react-icons/fi";

export default function Home() {
  return (
    <div className="scroll-smooth">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] relative overflow-hidden">
        <div className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxsaW5lIHgxPSIwIiB5PSIwIiB4Mj0iMCIgeTI9IjQwIiBzdHJva2U9IiNkZGRiZjIiIHN0cm9rZS13aWR0aD0iMiIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIgb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-20"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl z-10"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#3a506b] font-['Playfair_Display']">
            Discover Your Next <span className="text-[#5bc0be]">Favorite</span> Novel
          </h1>
          
          <p className="text-xl md:text-2xl text-[#333] mb-10 font-['Open_Sans']">
            Explore a vast collection of novels across all genres. Find your next great read with our curated recommendations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#5bc0be] hover:bg-[#4aa8a7] text-white font-bold py-4 px-8 rounded-full transition-colors"
            >
              Browse Library
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-[#3a506b] text-[#3a506b] font-bold py-4 px-8 rounded-full hover:bg-[#3a506b] hover:text-white transition-colors"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 text-[#3a506b]"
        >
          <FiArrowDown size={24} />
        </motion.div>
      </section>

      {/* Brands Section */}
      <section className="py-16 bg-white">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6"
        >
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 text-gray-500 font-medium">
            <span>Penguin</span>
            <span>HarperCollins</span>
            <span>Simon & Schuster</span>
            <span>Macmillan</span>
            <span>Hachette</span>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#f8f9fa]">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#3a506b] font-['Playfair_Display']"
          >
            Why Readers Love Us
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FaBookOpen className="w-8 h-8 text-white" />,
                title: "Extensive Collection",
                desc: "Access thousands of books across all genres from classic literature to contemporary bestsellers."
              },
              {
                icon: <FaSearch className="w-8 h-8 text-white" />,
                title: "Smart Search",
                desc: "Find exactly what you're looking for with our advanced search and filtering system."
              },
              {
                icon: <FaHeart className="w-8 h-8 text-white" />,
                title: "Personalized Recs",
                desc: "Get tailored recommendations based on your reading history and preferences."
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#5bc0be] bg-opacity-10 text-[#5bc0be] mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#3a506b]">{feature.title}</h3>
                <p className="text-[#555] font-['Open_Sans']">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#3a506b] font-['Playfair_Display']"
          >
            How It Works
          </motion.h2>
          
          <div className="relative">
            <div className="hidden lg:block absolute left-1/2 top-0 h-full w-1 bg-[#5bc0be] bg-opacity-30 transform -translate-x-1/2"></div>
            
            {[
              {
                step: "1",
                title: "Create Your Account",
                desc: "Sign up for free and set your reading preferences."
              },
              {
                step: "2",
                title: "Browse Collections",
                desc: "Explore books by genre, author, or recommendations."
              },
              {
                step: "3",
                title: "Start Reading",
                desc: "Purchase or borrow books with one click."
              }
            ].map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className={`relative lg:w-1/2 mb-12 ${index % 2 === 0 ? 'lg:mr-auto lg:pr-20' : 'lg:ml-auto lg:pl-20'} ${index === 2 ? 'mb-0' : ''}`}
              >
                <div className={`flex items-center justify-center w-12 h-12 rounded-full bg-[#5bc0be] text-white font-bold mb-4 absolute lg:${index % 2 === 0 ? 'left-0' : 'right-0'} transform lg:${index % 2 === 0 ? '-translate-x-1/2' : 'translate-x-1/2'}`}>
                  {step.step}
                </div>
                <div className="bg-[#f8f9fa] p-8 rounded-xl">
                  <h3 className="text-xl font-bold mb-2 text-[#3a506b]">{step.title}</h3>
                  <p className="text-[#555] font-['Open_Sans']">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#f8f9fa]">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#3a506b] font-['Playfair_Display']"
          >
            What Our Readers Say
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                initials: "JS",
                quote: "I've discovered so many great books I wouldn't have found otherwise. The recommendations are spot on!",
                rating: 5
              },
              {
                initials: "EM",
                quote: "The user interface is so intuitive and beautiful. It's my favorite place to find new books.",
                rating: 5
              },
              {
                initials: "TK",
                quote: "As an avid reader, I appreciate the extensive collection and easy search functionality.",
                rating: 4
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-sm"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#5bc0be] text-white font-bold mr-4">
                    {testimonial.initials}
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-[#555] italic font-['Open_Sans']">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#5bc0be] to-[#3a506b] text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-['Playfair_Display']">Ready to start your reading journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto font-['Open_Sans']">Join thousands of readers discovering their next favorite book every day.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#3a506b] hover:bg-opacity-90 font-bold py-4 px-8 rounded-full transition-colors"
              >
                Start Reading Now
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-full hover:bg-white hover:text-[#3a506b] transition-colors"
              >
                Contact Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}