import React, { useState } from 'react';
import { 
  Heart, MessageCircle, Users, HandHeart, 
  Lock, Shuffle, Gift, CheckCircle, X,
  Sparkles
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
      if (criteria.type === "rating" && value) {
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
    if (score < 2) return "Le côté obscur consume votre relation";
    if (score < 3) return "Un déséquilibre dans la Force menace votre union";
    if (score < 4) return "La Force s'équilibre dans votre relation";
    if (score < 4.5) return "Votre lien est aussi fort que la Force";
    return "Votre union transcende même la Force";
  };

  const canShowResults = () => {
    return allCriteria.every(c => notes[c.key] !== undefined);
  };

  return (
    <div className="min-h-screen">
     {/* Background avec votre image */}
        <div className="fixed inset-0 bg-black bg-cover bg-center" style={{ 
              backgroundImage: `url('/obscure.png')`
            }}>
          <div className="absolute inset-0 bg-black/60" /> {/* Overlay pour la lisibilité */}
      </div>

      {/* Main content */}
      <div className="relative min-h-screen flex flex-col justify-between">
        {/* Header Section */}
        <header className="pt-12 pb-6 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-red-500 tracking-tight">
              La Force de l'Union
            </h1>
            <p className="text-xl text-gray-400">Mesurez la puissance qui unit votre destin</p>
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
                  <div className="flex items-start gap-6">
                    <div className="p-3 rounded-lg bg-red-500/10">
                      <div className="w-6 h-6 text-red-500">
                        {criteria.icon}
                      </div>
                    </div>
                    
                    <div className="flex-grow space-y-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-semibold text-gray-100">{criteria.label}</h3>
                          <span className="px-2 py-1 text-xs rounded-full bg-red-500/10 text-red-400 font-medium">
                            Influence: {criteria.weight}
                          </span>
                        </div>
                        <p className="mt-1 text-gray-400">{criteria.description}</p>
                      </div>

                      {criteria.type === "rating" ? (
                        <div className="flex flex-wrap gap-3">
                          {[1, 2, 3, 4, 5].map((value) => (
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
                        <div className="flex gap-4">
                          {[true, false].map((value) => (
                            <button
                              key={value.toString()}
                              onClick={() => handleChange(criteria.key, value)}
                              className={`
                                px-6 py-3 rounded-lg flex items-center gap-2 text-lg font-medium
                                border-2 transition-all duration-300
                                ${notes[criteria.key] === value
                                  ? 'border-red-500 bg-red-500/20 text-red-400'
                                  : 'border-gray-700/50 bg-gray-800/30 text-gray-400 hover:border-red-500/50 hover:bg-red-500/10'}
                              `}
                            >
                              {value ? <CheckCircle className="w-5 h-5" /> : <X className="w-5 h-5" />}
                              {value ? 'Oui' : 'Non'}
                            </button>
                          ))}
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
              Révéler votre Destinée
            </button>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-6 px-4 text-center text-gray-500 bg-black/20 backdrop-blur-sm">
          <p>© {new Date().getFullYear()} La Force de l'Union</p>
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
                  <p>La Force a parlé. Ce score reflète l'équilibre et la puissance de votre union, 
                     mesuré à travers les aspects les plus cruciaux de votre relation.</p>
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