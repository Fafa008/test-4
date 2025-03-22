"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useAnimation, type Variants } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const linkVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      delay: i * 0.05,
    },
  }),
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const letterVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.04,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const logoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const lineVariants: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const teamMembers = [
  {
    name: "RAKOTO Dieu Donné Manjaka",
    role: "Backend Developer",
    email: "manjaka@gmail.com",
  },
  {
    name: "RAKOTOZANDRY Herisoa Dani",
    role: "Backend Developer",
    email: "@gmail.com",
  },
  {
    name: "ANDRIAMIHAJA Ainanirina Fanantenana ",
    role: "Frontend Developer",
    email: "@gmail.com",
  },
  {
    name: "FANEVA Solomampionona",
    role: "Frontend Developer",
    email: "@gmail.com",
  },
  {
    name: "RAZANADRAKOTOMIARINJATO Mandrindra",
    role: "Frontend Developer",
    email: "@gmail.com",
  },
]

export default function NounoursFooterWithText() {
  const footerRef = useRef<HTMLElement>(null)
  const isInView = useInView(footerRef, { once: false, amount: 0.2 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [isInView, controls])

  const nounoursText = "NOUNOURS"

  return (
    <footer ref={footerRef} className="bg-black h-full text-white py-10 px-6 md:px-12 relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-gray-900 opacity-80"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8">
          {/* Logo and brand */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={controls}
            className="flex flex-col items-center md:items-start"
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div variants={logoVariants} className="w-12 h-12">
                <svg
                  className="w-full h-full"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 500 500"
                  fill="none"
                >
                  <path
                    d="M0 0 C2.39371149 1.89561883 4.69332764 3.86154856 6.984375 5.87890625 C7.995 6.62140625 9.005625 7.36390625 10.046875 8.12890625 C18.92933508 15.68150649 24.20737182 26.4954524 28.984375 36.87890625 C33.60098254 36.18461176 37.696409 34.45195652 41.984375 32.69140625 C97.46330875 10.63324217 157.92151647 12.40815572 213.50439453 32.97802734 C217.30453618 34.35846864 221.14066562 35.62579021 224.984375 36.87890625 C225.3246875 36.14027344 225.665 35.40164062 226.015625 34.640625 C236.12800034 13.47456278 251.99237027 -1.8230249 273.984375 -10.12109375 C295.36376189 -17.54558125 318.792166 -15.56637434 339.17480469 -6.03515625 C358.522778 3.73802401 373.08902174 21.49029307 379.984375 41.87890625 C380.30277344 42.78898437 380.62117188 43.6990625 380.94921875 44.63671875 C387.03453359 65.66891291 383.60461787 89.08112438 373.2421875 108.0546875 C364.85941209 122.6237018 353.63335261 132.6510175 338.984375 140.87890625 C337.499375 141.86890625 337.499375 141.86890625 335.984375 142.87890625 C336.55285156 144.03003906 337.12132812 145.18117187 337.70703125 146.3671875 C366.82693871 206.06458211 369.76783866 271.56094636 348.515625 334.28125 C340.41298283 357.29275375 328.2398156 378.85950647 312.984375 397.87890625 C311.96537109 399.18408203 311.96537109 399.18408203 310.92578125 400.515625 C302.27148092 411.39304835 292.80558308 422.11095304 281.984375 430.87890625 C280.83645914 431.84933799 279.68941532 432.82080166 278.54296875 433.79296875 C269.17547207 441.66063322 259.47592301 448.59172533 248.984375 454.87890625 C247.84838867 455.56315674 247.84838867 455.56315674 246.68945312 456.26123047 C224.20092657 469.6354437 199.40506188 478.85948627 173.796875 484.12890625 C173.06235107 484.28020996 172.32782715 484.43151367 171.57104492 484.58740234 C156.80079537 487.4183002 142.11699413 488.28861122 127.109375 488.25390625 C126.21696106 488.25336243 125.32454712 488.2528186 124.40509033 488.2522583 C59.56099297 488.07160992 2.09809028 460.4133847 -44.015625 415.87890625 C-46.49866691 413.31985285 -48.76205158 410.64090782 -51.015625 407.87890625 C-51.98898797 406.72866259 -52.96301349 405.57897945 -53.9375 404.4296875 C-93.83141144 356.91961148 -112.93138197 294.88737411 -108.30908203 233.12597656 C-105.4168173 201.12338011 -96.16684581 171.59534634 -82.015625 142.87890625 C-83.23185547 142.16927734 -83.23185547 142.16927734 -84.47265625 141.4453125 C-106.27220492 128.42649007 -121.75753932 110.78620044 -128.09375 85.83984375 C-132.78478077 64.03941825 -128.42279794 41.73544525 -117.015625 22.87890625 C-114.59308812 19.27730234 -111.95316583 16.07004773 -109.015625 12.87890625 C-108.21640625 11.9765625 -107.4171875 11.07421875 -106.59375 10.14453125 C-79.36637028 -19.01615354 -32.39453541 -22.78527555 0 0 Z"
                    fill="#FFFFFF"
                    transform="translate(129.015625,19.12109375)"
                  />
                </svg>
              </motion.div>
              <motion.h2 variants={textVariants} className="text-2xl font-bold tracking-wider">
                NOUNOURS
              </motion.h2>
            </div>

            <motion.p variants={textVariants} className="text-gray-400 text-sm mb-4 text-center md:text-left">
              Creating innovative digital experiences with passion and precision.
            </motion.p>

            <motion.div
              variants={lineVariants}
              className="h-0.5 bg-gradient-to-r from-transparent via-white to-transparent w-32 md:w-40 mb-4 md:hidden"
            />
          </motion.div>

          {/* Navigation */}
          <motion.div variants={staggerContainer} initial="hidden" animate={controls} className="space-y-4">
            <motion.h3 variants={textVariants} className="text-lg font-medium mb-4 inline-block relative">
              Navigation
              <motion.span variants={lineVariants} className="absolute bottom-0 left-0 h-0.5 bg-white w-full" />
            </motion.h3>

            <motion.div variants={staggerContainer} className="grid grid-cols-2 gap-x-6 gap-y-3">
              {["Work", "Services", "About", "Projects", "Portfolio", "Contact"].map((item, index) => (
                <motion.div key={index} variants={linkVariants} custom={index}>
                  <a
                    href="#"
                    className="text-base font-medium hover:text-gray-300 transition-colors flex items-center group relative overflow-hidden"
                  >
                    <span className="relative z-10">{item}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300 ease-in-out"></span>
                    <ArrowUpRight
                      className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                      size={14}
                    />
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Team */}
          <motion.div variants={staggerContainer} initial="hidden" animate={controls} className="space-y-4">
            <motion.h3 variants={textVariants} className="text-lg font-medium mb-4 inline-block relative">
              Our Team
              <motion.span variants={lineVariants} className="absolute bottom-0 left-0 h-0.5 bg-white w-full" />
            </motion.h3>

            <div className="grid grid-cols-1 gap-y-2">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  variants={linkVariants}
                  custom={index}
                  className="flex justify-between items-center border-b border-gray-800 pb-2 group hover:border-gray-700 transition-colors"
                >
                  <div>
                    <h4 className="text-sm font-semibold group-hover:text-white transition-colors">{member.name}</h4>
                    <p className="text-gray-400 text-xs">{member.role}</p>
                  </div>
                  <a
                    href={`mailto:${member.email}`}
                    className="text-xs text-gray-500 hover:text-white transition-colors flex items-center group-hover:text-gray-300"
                  >
                    {member.email}
                    <ArrowUpRight className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" size={12} />
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Large "NOUNOURS" text - more compact version */}
        <div className="overflow-hidden mb-6">
          <motion.div className="flex justify-center" initial="hidden" animate={controls}>
            <div className="flex overflow-hidden">
              {nounoursText.split("").map((letter, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={letterVariants}
                  className="text-5xl sm:text-6xl md:text-7xl font-bold inline-block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500"
                  style={{
                    display: "inline-block",
                    lineHeight: 0.9,
                    marginRight: letter === " " ? "0.5em" : "0",
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom line */}
        <motion.div
          className="pt-4 border-t border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center text-xs text-gray-500 gap-2"
          variants={textVariants}
          initial="hidden"
          animate={controls}
        >
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 500 500"
              fill="none"
            >
              <path
                d="M0 0 C2.39371149 1.89561883 4.69332764 3.86154856 6.984375 5.87890625 C7.995 6.62140625 9.005625 7.36390625 10.046875 8.12890625 C18.92933508 15.68150649 24.20737182 26.4954524 28.984375 36.87890625 C33.60098254 36.18461176 37.696409 34.45195652 41.984375 32.69140625 C97.46330875 10.63324217 157.92151647 12.40815572 213.50439453 32.97802734 C217.30453618 34.35846864 221.14066562 35.62579021 224.984375 36.87890625 C225.3246875 36.14027344 225.665 35.40164062 226.015625 34.640625 C236.12800034 13.47456278 251.99237027 -1.8230249 273.984375 -10.12109375 C295.36376189 -17.54558125 318.792166 -15.56637434 339.17480469 -6.03515625 C358.522778 3.73802401 373.08902174 21.49029307 379.984375 41.87890625 C380.30277344 42.78898437 380.62117188 43.6990625 380.94921875 44.63671875 C387.03453359 65.66891291 383.60461787 89.08112438 373.2421875 108.0546875 C364.85941209 122.6237018 353.63335261 132.6510175 338.984375 140.87890625 C337.499375 141.86890625 337.499375 141.86890625 335.984375 142.87890625 C336.55285156 144.03003906 337.12132812 145.18117187 337.70703125 146.3671875 C366.82693871 206.06458211 369.76783866 271.56094636 348.515625 334.28125 C340.41298283 357.29275375 328.2398156 378.85950647 312.984375 397.87890625 C311.96537109 399.18408203 311.96537109 399.18408203 310.92578125 400.515625 C302.27148092 411.39304835 292.80558308 422.11095304 281.984375 430.87890625 C280.83645914 431.84933799 279.68941532 432.82080166 278.54296875 433.79296875 C269.17547207 441.66063322 259.47592301 448.59172533 248.984375 454.87890625 C247.84838867 455.56315674 247.84838867 455.56315674 246.68945312 456.26123047 C224.20092657 469.6354437 199.40506188 478.85948627 173.796875 484.12890625 C173.06235107 484.28020996 172.32782715 484.43151367 171.57104492 484.58740234 C156.80079537 487.4183002 142.11699413 488.28861122 127.109375 488.25390625 C126.21696106 488.25336243 125.32454712 488.2528186 124.40509033 488.2522583 C59.56099297 488.07160992 2.09809028 460.4133847 -44.015625 415.87890625 C-46.49866691 413.31985285 -48.76205158 410.64090782 -51.015625 407.87890625 C-51.98898797 406.72866259 -52.96301349 405.57897945 -53.9375 404.4296875 C-93.83141144 356.91961148 -112.93138197 294.88737411 -108.30908203 233.12597656 C-105.4168173 201.12338011 -96.16684581 171.59534634 -82.015625 142.87890625 C-83.23185547 142.16927734 -83.23185547 142.16927734 -84.47265625 141.4453125 C-106.27220492 128.42649007 -121.75753932 110.78620044 -128.09375 85.83984375 C-132.78478077 64.03941825 -128.42279794 41.73544525 -117.015625 22.87890625 C-114.59308812 19.27730234 -111.95316583 16.07004773 -109.015625 12.87890625 C-108.21640625 11.9765625 -107.4171875 11.07421875 -106.59375 10.14453125 C-79.36637028 -19.01615354 -32.39453541 -22.78527555 0 0 Z"
                fill="#FFFFFF"
                transform="translate(129.015625,19.12109375)"
              />
            </svg>
            <span>© {new Date().getFullYear()} Nounours. All rights reserved.</span>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">
              Terms
            </a>
            <span>Crafted with passion</span>
          </div>
        </motion.div>
      </div>

      {/* Subtle animated background particles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white opacity-5"
            style={{
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -50 - 20],
              opacity: [0.05, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              ease: "linear",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </footer>
  )
}

