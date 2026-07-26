import { motion } from "framer-motion";
import { Bot } from "lucide-react";

function TypingIndicator() {
  return (
    <div className="flex gap-3">

      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">

        <Bot
          size={20}
          className="text-white"
        />

      </div>

      <div className="bg-[#1E293B] rounded-3xl px-6 py-5 flex gap-2">

        {[0,1,2].map((dot)=>(

          <motion.div
            key={dot}
            className="w-2 h-2 rounded-full bg-violet-400"
            animate={{
              y:[0,-6,0],
              opacity:[.4,1,.4]
            }}
            transition={{
              duration:.7,
              repeat:Infinity,
              delay:dot*.15
            }}
          />

        ))}

      </div>

    </div>
  );
}

export default TypingIndicator;