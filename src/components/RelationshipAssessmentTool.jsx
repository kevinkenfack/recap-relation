import React, { useState, useEffect } from 'react';
import { 
  Heart, Star, MessageCircle, Users, HandHeart, 
  Lock, Shuffle, Gift, CheckCircle, X,
  Info
} from 'lucide-react';

const RelationshipAssessmentTool = () => {
  const [notes, setNotes] = useState({
    emotionalSupport: 0,
    responsibilitySharing: 0,
    communication: 0,
    compromise: 0,
    mutualTrust: 0,
    affection: 0
  });

  const [giftNotes, setGiftNotes] = useState({
    birthdayGifts: null,
    anniversaryGifts: null,
    spontaneousGifts: null,
    thoughtfulGifts: null
  });

  const [showResults, setShowResults] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [bonusPoints, setBonusPoints] = useState(0);

  const ratingDescriptions = {
    0: "Non évalué",
    1: "Très insuffisant",
    2: "Insuffisant",
    3: "Moyen",
    4: "Bon",
    5: "Excellent"
  };

  const criteriaDetails = [
    { 
      key: "emotionalSupport", 
      label: "Soutien Émotionnel", 
      icon: <HandHeart className="text-teal-400" />,
      description: "Capacité à être présent et empathique lors des moments difficiles",
      weight: 1.2
    },
    { 
      key: "responsibilitySharing", 
      label: "Partage des Responsabilités", 
      icon: <Users className="text-blue-400" />,
      description: "Répartition équitable des tâches et décisions",
      weight: 1.0
    },
    { 
      key: "communication", 
      label: "Communication", 
      icon: <MessageCircle className="text-green-400" />,
      description: "Ouverture, écoute active et expression claire des sentiments",
      weight: 1.3
    },
    { 
      key: "compromise", 
      label: "Compromis et Ajustements", 
      icon: <Shuffle className="text-purple-400" />,
      description: "Capacité à trouver des solutions mutuellement satisfaisantes",
      weight: 1.1
    },
    { 
      key: "mutualTrust", 
      label: "Confiance Mutuelle", 
      icon: <Lock className="text-pink-400" />,
      description: "Sentiment de sécurité et de fiabilité dans la relation",
      weight: 1.4
    },
    { 
      key: "affection", 
      label: "Démonstration d'Affection", 
      icon: <Heart className="text-red-400" />,
      description: "Expressions physiques et verbales d'amour",
      weight: 1.0
    }
  ];

  const giftOptions = [
    { key: "birthdayGifts", label: "Cadeaux d'anniversaire", points: 0.3 },
    { key: "anniversaryGifts", label: "Cadeaux d'anniversaire de relation", points: 0.4 },
    { key: "spontaneousGifts", label: "Cadeaux spontanés", points: 0.5 },
    { key: "thoughtfulGifts", label: "Cadeaux réfléchis et personnalisés", points: 0.3 }
  ];

  const handleChange = (value, critere) => {
    setNotes(prev => ({
      ...prev,
      [critere]: parseInt(value)
    }));
  };

  const handleGiftChange = (key, value) => {
    setGiftNotes(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const calculerNoteGlobale = () => {
    // Calcul pondéré des critères principaux
    let totalWeightedScore = 0;
    let totalWeight = 0;

    criteriaDetails.forEach(criteria => {
      const score = notes[criteria.key];
      totalWeightedScore += score * criteria.weight;
      totalWeight += criteria.weight;
    });

    const baseScore = totalWeightedScore / totalWeight;

    // Calcul des points bonus pour les cadeaux
    const giftScore = giftOptions.reduce((acc, option) => {
      return acc + (giftNotes[option.key] === true ? option.points : 0);
    }, 0);

    setBonusPoints(giftScore);
    const finalScore = Math.min(5, baseScore + giftScore);
    setTotalScore(finalScore);
    
    return finalScore.toFixed(2);
  };

  const interpreterNote = (note) => {
    if (note < 2) return "Relation en grande difficulté";
    if (note < 3) return "Relation fragile nécessitant des améliorations";
    if (note < 4) return "Relation stable mais à développer";
    if (note < 4.5) return "Relation solide et épanouissante";
    return "Relation exceptionnelle et harmonieuse";
  };

  const handleShowResults = () => {
    const allCriteriaRated = Object.values(notes).every(note => note > 0);
    const allGiftsEvaluated = Object.values(giftNotes).every(note => note !== null);

    if (allCriteriaRated && allGiftsEvaluated) {
      setShowResults(true);
    } else {
      alert("Veuillez évaluer tous les critères et répondre aux questions sur les cadeaux avant de voir les résultats.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col justify-between" 
         style={{
           backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.95)), url("/api/placeholder/1920/1080")',
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundAttachment: 'fixed'
         }}>
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-gray-900 rounded-2xl shadow-2xl overflow-hidden backdrop-blur">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6">
            <div className="flex items-center mb-4">
              <Heart className="w-8 h-8 mr-3 text-teal-400" />
              <h2 className="text-2xl font-bold">Évaluation de Relation</h2>
            </div>
            <p className="text-gray-400 text-sm">
              Une analyse approfondie de votre relation basée sur des critères pondérés
            </p>
          </div>

          {/* Main Content */}
          <div className="p-4 lg:p-6 grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {/* Criteria Section */}
              <div className="space-y-3">
                {criteriaDetails.map((criteria) => (
                  <div key={criteria.key} 
                       className="bg-gray-800 p-4 rounded-lg shadow transition-all hover:shadow-lg hover:bg-gray-750">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">{criteria.icon}</div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-gray-200">{criteria.label}</h3>
                          <span className="text-xs text-gray-400">
                            (x{criteria.weight})
                          </span>
                        </div>
                        <p className="text-sm text-gray-400">{criteria.description}</p>
                      </div>
                      <select 
                        value={notes[criteria.key]}
                        onChange={(e) => handleChange(e.target.value, criteria.key)}
                        className="bg-gray-700 border-gray-600 text-gray-200 rounded p-1 text-sm"
                      >
                        {Object.entries(ratingDescriptions).map(([value, label]) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>

              {/* Gifts Section */}
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center mb-4">
                  <Gift className="text-amber-400 mr-2" />
                  <h3 className="text-lg font-medium">Cadeaux et Surprises</h3>
                  <span className="ml-2 text-xs text-gray-400">(Points bonus)</span>
                </div>
                <div className="space-y-3">
                  {giftOptions.map((option) => (
                    <div key={option.key} 
                         className="flex items-center justify-between p-2 bg-gray-750 rounded">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-300">{option.label}</span>
                        <span className="text-xs text-gray-500">
                          (+{option.points} pts)
                        </span>
                      </div>
                      <div className="flex gap-4">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name={option.key}
                            checked={giftNotes[option.key] === true}
                            onChange={() => handleGiftChange(option.key, true)}
                            className="hidden"
                          />
                          <div className={`w-6 h-6 flex items-center justify-center rounded border ${
                            giftNotes[option.key] === true 
                              ? 'bg-teal-500 border-teal-500' 
                              : 'border-gray-600'
                          }`}>
                            {giftNotes[option.key] === true && <CheckCircle className="w-4 h-4 text-white" />}
                          </div>
                          <span className="ml-2 text-sm">Oui</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name={option.key}
                            checked={giftNotes[option.key] === false}
                            onChange={() => handleGiftChange(option.key, false)}
                            className="hidden"
                          />
                          <div className={`w-6 h-6 flex items-center justify-center rounded border ${
                            giftNotes[option.key] === false 
                              ? 'bg-red-500 border-red-500' 
                              : 'border-gray-600'
                          }`}>
                            {giftNotes[option.key] === false && <X className="w-4 h-4 text-white" />}
                          </div>
                          <span className="ml-2 text-sm">Non</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button 
                onClick={handleShowResults}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2 mt-6"
              >
                <CheckCircle className="w-5 h-5" />
                Voir les Résultats
              </button>
            </div>

            {/* Right side placeholder */}
            <div className="hidden md:flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Heart className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p>Complétez l'évaluation pour voir vos résultats</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black bg-opacity-80 text-center py-3 px-4">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Outil d'Évaluation de Relation. Tous droits réservés.
        </p>
      </footer>

      {/* Results Modal */}
      {showResults && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-fade-in">
            <button 
              onClick={() => setShowResults(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center">
              <div className="mb-6">
                <Heart className="w-12 h-12 mx-auto text-teal-400 mb-2" />
                <h3 className="text-2xl font-bold text-gray-100">Résultats de l'Évaluation</h3>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 mb-6">
                <div className="text-5xl font-bold text-teal-400 mb-4">
                  {calculerNoteGlobale()}
                  <span className="text-xl text-gray-400">/5</span>
                </div>
                
                <div className="text-sm text-gray-400 mb-4">
                  Points bonus: +{bonusPoints.toFixed(1)}
                </div>
                
                <div className="text-lg font-medium text-gray-200 mt-2">
                  {interpreterNote(parseFloat(calculerNoteGlobale()))}
                </div>
              </div>

              <div className="text-gray-400 text-sm">
                <p className="mb-2">
                  Cette évaluation prend en compte:
                </p>
                <ul className="text-left text-xs space-y-1">
                  <li>• Les critères principaux (pondérés selon leur importance)</li>
                  <li>• Les points bonus des attentions et cadeaux</li>
                  <li>• L'équilibre global de la relation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RelationshipAssessmentTool;