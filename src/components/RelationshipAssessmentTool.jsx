import React, { useState } from 'react';
import { 
  Heart, MessageCircle, Users, HandHeart, 
  Lock, Shuffle, Gift, CheckCircle, X,
  Sparkles, ChevronDown
} from 'lucide-react';

const RelationshipAssessmentTool = () => {
  const [notes, setNotes] = useState({});
  const [showResults, setShowResults] = useState(false);

  const allCriteria = [
    {
      key: "emotionalSupport",
      label: "Soutien Émotionnel",
      icon: <HandHeart />,
      description: "Présence et empathie dans les moments difficiles",
      weight: 1.2,
      type: "rating"
    },
    {
      key: "communication",
      label: "Communication",
      icon: <MessageCircle />,
      description: "Écoute active et expression des sentiments",
      weight: 1.3,
      type: "rating"
    },
    {
      key: "mutualTrust",
      label: "Confiance Mutuelle",
      icon: <Lock />,
      description: "Sentiment de sécurité dans la relation",
      weight: 1.4,
      type: "rating"
    },
    {
      key: "birthdayGifts",
      label: "Cadeaux d'Anniversaire",
      icon: <Gift />,
      description: "Attention particulière aux anniversaires",
      weight: 0.3,
      type: "boolean"
    },
    {
      key: "responsibilitySharing",
      label: "Partage des Responsabilités",
      icon: <Users />,
      description: "Équilibre des tâches et décisions",
      weight: 1.0,
      type: "rating"
    },
    {
      key: "compromise",
      label: "Capacité au Compromis",
      icon: <Shuffle />,
      description: "Recherche de solutions communes",
      weight: 1.1,
      type: "rating"
    },
    {
      key: "thoughtfulGifts",
      label: "Cadeaux Personnalisés",
      icon: <Sparkles />,
      description: "Cadeaux réfléchis et adaptés aux goûts",
      weight: 0.3,
      type: "boolean"
    }
  ];

  const handleChange = (key, value) => {
    setNotes(prev => ({...prev, [key]: value}));
  };

  const calculateScore = () => {
    let totalWeightedScore = 0;
    let totalWeight = 0;

    allCriteria.forEach(criteria => {
      const value = notes[criteria.key];
      if (criteria.type === "rating" && value !== undefined) {
        totalWeightedScore += value * criteria.weight;
        totalWeight += criteria.weight;
      } else if (criteria.type === "boolean") {
        totalWeightedScore += (value ? 5 : 0) * criteria.weight;
        totalWeight += criteria.weight;
      }
    });

    return totalWeight > 0 ? (totalWeightedScore / totalWeight).toFixed(2) : 0;
  };

  const getInterpretation = (score) => {
    if (score < 1) return "Cette relation risque de te détruire émotionnellement 😢";
    if (score < 2) return "Il serait peut-être temps de remettre en question cette relation";
    if (score < 3) return "La relation est complètement déséquilibrée";
    if (score < 4) return "La relation est bonne, mais reste vigilant et ne baisse pas la garde";
    if (score < 4.5) return "Votre relation est équilibrée et saine";
    return "La relation fonctionne à plein régime, mais il est important de toujours rester attentif";
  };  

  const canShowResults = () => {
    return allCriteria.every(c => notes[c.key] !== undefined);
  };

  return (
    <div className="min-h-screen">
      {/* Background*/}
      <div className="fixed inset-0 bg-black bg-cover bg-center" style={{ 
        backgroundImage: `url('/back.jpg')`
      }}>
        <div className="absolute inset-0 bg-black/60" /> {/* Overlay pour la lisibilité */}
      </div>

      {/* Main content */}
      <div className="relative min-h-screen flex flex-col justify-between">
        {/* Header Section */}
        <header className="pt-12 pb-6 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-red-500 tracking-tight">
                Le Coté Obscur
            </h1>
            <p className="text-lg md:text-xl text-gray-400">Ceci est un outils qui vous permet de faire le bilan de la relation que vous entretenez avec votre copine actuelle afin de prendre une discision éclairer.</p>
          </div>
        </header>

        {/* Criteria Grid */}
        <main className="flex-grow px-4 py-8">
          <div className="max-w-4xl mx-auto grid gap-6">
            {allCriteria.map((criteria) => (
              <div 
                key={criteria.key}
                className="bg-gray-900/40 backdrop-blur-sm border border-red-900/20 rounded-2xl overflow-hidden hover:bg-gray-900/60 transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="p-3 rounded-lg bg-red-500/10 self-start">
                      <div className="w-6 h-6 text-red-500">
                        {criteria.icon}
                      </div>
                    </div>
                    
                    <div className="flex-grow space-y-4 w-full">
                      <div>
                        <div className="flex flex-col md:flex-row md:items-center gap-3">
                          <h3 className="text-xl font-semibold text-gray-100">{criteria.label}</h3>
                          <span className="px-2 py-1 text-xs rounded-full bg-red-500/10 text-red-400 font-medium self-start md:self-auto">
                            Influence: {criteria.weight}
                          </span>
                        </div>
                        <p className="mt-1 text-gray-400">{criteria.description}</p>
                      </div>

                      {criteria.type === "rating" ? (
                        <div className="flex flex-wrap gap-3">
                          {[0, 1, 2, 3, 4, 5].map((value) => (
                            <button
                              key={value}
                              onClick={() => handleChange(criteria.key, value)}
                              className={`
                                w-14 h-14 rounded-lg flex items-center justify-center text-lg font-semibold
                                border-2 transition-all duration-300
                                ${notes[criteria.key] === value 
                                  ? 'border-red-500 bg-red-500/20 text-red-400' 
                                  : 'border-gray-700/50 bg-gray-800/30 text-gray-400 hover:border-red-500/50 hover:bg-red-500/10'}
                              `}
                            >
                              {value}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="flex space-x-4">
                          <button
                            onClick={() => handleChange(criteria.key, true)}
                            className={`
                              flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-lg font-medium
                              transition-all duration-300
                              ${notes[criteria.key] === true
                                ? 'bg-green-500/20 text-green-400 border-2 border-green-500'
                                : 'bg-gray-800/30 text-gray-400 hover:bg-green-500/10 border-2 border-gray-700/50'}
                            `}
                          >
                            <CheckCircle className="w-5 h-5" /> Oui
                          </button>
                          <button
                            onClick={() => handleChange(criteria.key, false)}
                            className={`
                              flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-lg font-medium
                              transition-all duration-300
                              ${notes[criteria.key] === false
                                ? 'bg-red-500/20 text-red-400 border-2 border-red-500'
                                : 'bg-gray-800/30 text-gray-400 hover:bg-red-500/10 border-2 border-gray-700/50'}
                            `}
                          >
                            <X className="w-5 h-5" /> Non
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Results Button */}
          <div className="max-w-4xl mx-auto mt-8">
            <button
              onClick={() => canShowResults() && setShowResults(true)}
              className={`
                w-full py-4 rounded-xl text-lg font-semibold
                transition-all duration-300 flex items-center justify-center gap-2
                ${canShowResults()
                  ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20'
                  : 'bg-gray-800/50 text-gray-500 cursor-not-allowed'}
              `}
            >
              <Heart className="w-6 h-6" />
              Voir le reslutat
            </button>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-6 px-4 text-center text-gray-500 bg-black/20 backdrop-blur-sm">
          <p>© {new Date().getFullYear()} Le coté obscur</p>
        </footer>

        {/* Results Modal */}
        {showResults && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900/90 border-2 border-red-500/20 rounded-2xl max-w-lg w-full p-8 relative">
              <button 
                onClick={() => setShowResults(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center space-y-6">
                <div className="relative w-24 h-24 mx-auto">
                  <div className="absolute inset-0 bg-red-500/20 rounded-full animate-pulse" />
                  <Heart className="w-16 h-16 absolute inset-0 m-auto text-red-500" />
                </div>
                
                <div>
                  <div className="text-7xl font-bold text-red-500 mb-2">
                    {calculateScore()}
                  </div>
                  <div className="text-xl text-gray-300">
                    {getInterpretation(parseFloat(calculateScore()))}
                  </div>
                </div>

                <div className="text-gray-400 bg-black/40 rounded-xl p-6">
                  <p>Ce score reflète l'équilibre et la force d'une relation, 
                     mesuré à travers les aspects les plus cruciaux d'une relation. la descision finale te revient</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RelationshipAssessmentTool;