"use client";

import { useState, FormEvent } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [messageStatus, setMessageStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [selectedOption, setSelectedOption] = useState(0);

  const contactOptions = [
    { 
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/harbor-mail.png", 
      label: "EMAIL", 
      value: "lifelix1209@outlook.com" 
    },
    { 
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/town-map.png", 
      label: "LOCATION", 
      value: "CAMBRIDGE" 
    },
    { 
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/teachy-tv.png", 
      label: "WEBSITE", 
      value: "Pokemon Master Journey of Felix" 
    },
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setMessageStatus("sending");

    // Simulate sending
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setMessageStatus("sent");
    setIsSending(false);
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center bg-pokemon-dark py-20 relative"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-pokemon-yellow pokemon-text mb-4">
            <img 
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" 
              alt="pokeball" 
              className="inline-block w-8 h-8 mr-2" 
            />
            POKéMON CENTER
            <img 
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" 
              alt="pokeball" 
              className="inline-block w-8 h-8 ml-2" 
            />
          </h2>
          <div className="w-48 h-1 bg-pokemon-red mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Contact Info (Pokedex Style) */}
          <div className="bg-pokemon-red rounded-xl p-6 border-4 border-pokemon-red-dark shadow-2xl">
            {/* Pokedex Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-pokemon-blue rounded-full border-4 border-pokemon-blue-dark flex items-center justify-center">
                <img 
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/exp-share.png" 
                  alt="communication" 
                  className="w-10 h-10 animate-pulse" 
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-pokemon-cream">
                  COMMUNICATION
                </h3>
                <p className="text-pokemon-cream/70 text-sm">
                  Get in touch with me
                </p>
              </div>
            </div>

            {/* Contact Options */}
            <div className="space-y-3">
              {contactOptions.map((option, index) => (
                <div
                  key={option.label}
                  className={`
                    flex items-center gap-4 p-3 rounded-lg cursor-pointer
                    transition-all duration-200 border-2
                    ${
                      selectedOption === index
                        ? "bg-pokemon-yellow text-pokemon-dark border-pokemon-yellow-dark"
                        : "bg-pokemon-red-dark text-pokemon-cream border-transparent hover:bg-pokemon-red"
                    }
                  `}
                  onClick={() => setSelectedOption(index)}
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <img
                      src={option.icon}
                      alt={option.label}
                      className="w-8 h-8"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-sm">{option.label}</div>
                    <div className="text-xs opacity-70">{option.value}</div>
                  </div>
                  {selectedOption === index && (
                    <img 
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-normal.png" 
                      alt="selected" 
                      className="w-6 h-6" 
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-8 pt-4 border-t-2 border-pokemon-red-dark">
              <p className="text-pokemon-cream text-sm mb-4 text-center">
                SOCIAL NETWORKS
              </p>
              <div className="flex justify-center gap-4">
                {[
                  { 
                    icon: "https://cdn.simpleicons.org/github/181717", 
                    label: "GITHUB", 
                    url: "https://github.com" 
                  },
                  {
                    icon: "/assets/icons/linkedin.svg",
                    label: "LINKEDIN",
                    url: "https://linkedin.com"
                  },
                  { 
                    icon: "https://cdn.simpleicons.org/x/000000", 
                    label: "X/TWITTER", 
                    url: "https://twitter.com" 
                  },
                  { 
                    icon: "https://cdn.simpleicons.org/instagram/E4405F", 
                    label: "INSTAGRAM", 
                    url: "https://instagram.com" 
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-pokemon-yellow-dark hover:scale-110 transition-transform shadow-lg"
                    title={social.label}
                  >
                    <img
                      src={social.icon}
                      alt={social.label}
                      className="w-7 h-7"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Message Form (Game Boy Style) */}
          <div className="bg-pokemon-green-dark rounded-xl p-6 border-4 border-pokemon-green shadow-2xl">
            {/* Form Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-pokemon-cream rounded-full flex items-center justify-center border-4 border-pokemon-brown">
                <img 
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/letter.png" 
                  alt="mail" 
                  className="w-8 h-8" 
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-pokemon-cream">
                  SEND MESSAGE
                </h3>
                <p className="text-pokemon-cream/70 text-sm">
                  I'll reply at Lv. Speed
                </p>
              </div>
            </div>

            {/* Message Form */}
            {messageStatus === "sent" ? (
              <div className="dialog-box p-8 text-center">
                <img 
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/potion.png" 
                  alt="success" 
                  className="w-20 h-20 mx-auto mb-4" 
                />
                <h4 className="text-xl font-bold text-pokemon-dark mb-2">
                  MESSAGE SENT!
                </h4>
                <p className="text-pokemon-dark">
                  Your message has been received. I'll respond as soon as possible!
                </p>
                <button
                  onClick={() => setMessageStatus("idle")}
                  className="gba-button mt-6 px-6 py-2"
                >
                  SEND ANOTHER
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Input */}
                <div>
                  <label className="block text-pokemon-cream text-sm font-bold mb-2 flex items-center gap-2">
                    <img 
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/vs-recorder.png" 
                      alt="name" 
                      className="w-5 h-5" 
                    />
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-pokemon-cream border-4 border-pokemon-green rounded-lg focus:border-pokemon-yellow focus:outline-none text-pokemon-dark font-bold placeholder-pokemon-green-dark"
                    placeholder="Enter your name..."
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-pokemon-cream text-sm font-bold mb-2 flex items-center gap-2">
                    <img 
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/wave-mail.png" 
                      alt="email" 
                      className="w-5 h-5" 
                    />
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-pokemon-cream border-4 border-pokemon-green rounded-lg focus:border-pokemon-yellow focus:outline-none text-pokemon-dark font-bold placeholder-pokemon-green-dark"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Message Input */}
                <div>
                  <label className="block text-pokemon-cream text-sm font-bold mb-2 flex items-center gap-2">
                    <img 
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/bead-mail.png" 
                      alt="message" 
                      className="w-5 h-5" 
                    />
                    MESSAGE
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-pokemon-cream border-4 border-pokemon-green rounded-lg focus:border-pokemon-yellow focus:outline-none text-pokemon-dark font-bold placeholder-pokemon-green-dark resize-none"
                    placeholder="Write your message..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSending}
                  className={`
                    w-full py-4 rounded-lg font-bold text-lg tracking-wider
                    transition-all duration-200
                    ${
                      isSending
                        ? "bg-gray-400 cursor-not-allowed"
                        : "gba-button bg-pokemon-yellow border-pokemon-yellow-dark"
                    }
                  `}
                >
                  {isSending ? (
                    <span className="flex items-center justify-center gap-2">
                      <img 
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/safari-ball.png" 
                        alt="sending" 
                        className="w-6 h-6 animate-spin" 
                      />
                      SENDING...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <img 
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/vs-seeker.png" 
                        alt="send" 
                        className="w-6 h-6" 
                      />
                      SEND MESSAGE
                    </span>
                  )}
                </button>
              </form>
            )}

            {/* Bottom Decoration */}
            <div className="mt-6 flex justify-center gap-2">
              <div className="w-3 h-3 rounded-full bg-pokemon-red animate-pulse" />
              <div className="w-3 h-3 rounded-full bg-pokemon-yellow animate-pulse delay-100" />
              <div className="w-3 h-3 rounded-full bg-pokemon-green animate-pulse delay-200" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-pokemon-cream/10 border-2 border-pokemon-cream/30 rounded-lg px-6 py-3">
            <p className="text-pokemon-cream text-sm flex items-center justify-center gap-2">
              Made with 
              <img 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/heart-scale.png" 
                alt="love" 
                className="inline-block w-5 h-5" 
              /> 
              by FELIX.INFO | © 2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
