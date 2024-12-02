import React, { useState } from 'react';
import { 
  Heart, MessageCircle, Users, HandHeart, 
  Lock, Shuffle, Gift, CheckCircle, X,
  GiftIcon, Package, Sparkles
} from 'lucide-react';

const RelationshipAssessmentTool = () => {
  const [notes, setNotes] = useState({});
  const [showResults, setShowResults] = useState(false);

  const ratingDescriptions = {
    0: "Non évalué",
    1: "Très insuffisant",
    2: "Insuffisant",
    3: "Moyen",
    4: "Bon",
    5: "Excellent"
  };

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
      key: "spontaneousGifts",
      label: "Cadeaux Spontanés",
      icon: <Package />,
      description: "Surprises et cadeaux inattendus",
      weight: 0.5,
      type: "boolean"
    },
    {
      key: "anniversaryGifts",
      label: "Cadeaux d'Anniversaire de Relation",
      icon: <Heart />,
      description: "Attention aux dates importantes du couple",
      weight: 0.4,
      type: "boolean"
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
    setNotes(prev => ({
      ...prev,
      [key]: value
    }));
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
    if (score < 2) return "Relation nécessitant attention et dialogue";
    if (score < 3) return "Relation avec potentiel d'amélioration";
    if (score < 4) return "Relation équilibrée et positive";
    if (score < 4.5) return "Relation épanouissante";
    return "Relation exceptionnelle";
  };

  const canShowResults = () => {
    return allCriteria.every(c => notes[c.key] !== undefined);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 flex flex-col">
      <div className="flex-grow">
        <div className="max-w-4xl mx-auto p-6">
          <header className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4 text-teal-400">Évaluation de Relation</h1>
            <p className="text-gray-400">Analysez la qualité de votre relation à travers différents aspects</p>
          </header>

          <div className="grid gap-6">
            {allCriteria.map((criteria) => (
              <div key={criteria.key} 
                   className="bg-gray-800/50 backdrop-blur rounded-xl p-6 transition-all hover:bg-gray-800/70">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-700/50 rounded-lg text-teal-400">
                    {criteria.icon}
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium">{criteria.label}</h3>
                      <span className="text-xs text-teal-400">×{criteria.weight}</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-4">{criteria.description}</p>
                    
                    {criteria.type === "rating" ? (
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <button
                            key={value}
                            onClick={() => handleChange(criteria.key, value)}
                            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all
                              ${notes[criteria.key] === value 
                                ? 'bg-teal-500 text-white' 
                                : 'bg-gray-700/50 hover:bg-gray-700'}`}
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
                            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all
                              ${notes[criteria.key] === value
                                ? value 
                                  ? 'bg-teal-500 text-white'
                                  : 'bg-red-500 text-white'
                                : 'bg-gray-700/50 hover:bg-gray-700'}`}
                          >
                            {value ? <CheckCircle className="w-4 h-4" /> : <X className="w-4 h-4" />}
                            {value ? 'Oui' : 'Non'}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => canShowResults() && setShowResults(true)}
            className={`w-full mt-8 p-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2
              ${canShowResults()
                ? 'bg-teal-500 hover:bg-teal-600 text-white'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
          >
            <CheckCircle className="w-5 h-5" />
            Voir les Résultats
          </button>
        </div>
      </div>

      <footer className="bg-gray-900/80 backdrop-blur-sm mt-8 py-4 text-center text-gray-400">
        <p className="text-sm">
          © {new Date().getFullYear()} Outil d'Évaluation de Relation. Tous droits réservés.
        </p>
      </footer>

      {showResults && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="bg-gray-900 rounded-2xl max-w-md w-full p-8 relative">
            <button 
              onClick={() => setShowResults(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center">
              <Heart className="w-16 h-16 text-teal-400 mx-auto mb-6" />
              
              <div className="mb-8">
                <div className="text-6xl font-bold text-teal-400 mb-2">
                  {calculateScore()}
                </div>
                <div className="text-xl text-gray-200">
                  {getInterpretation(parseFloat(calculateScore()))}
                </div>
              </div>

              <div className="text-sm text-gray-400">
                <p>Cette évaluation prend en compte tous les aspects de votre relation, 
                   pondérés selon leur importance relative pour une relation équilibrée.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RelationshipAssessmentTool;