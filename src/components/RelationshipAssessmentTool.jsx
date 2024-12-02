import React, { useState } from 'react';
import { 
  Heart, Star, MessageCircle, Users, HandHeart, 
  Lock, Shuffle, Gift, CheckCircle, X 
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
      description: "Capacité à être présent et empathique lors des moments difficiles"
    },
    { 
      key: "responsibilitySharing", 
      label: "Partage des Responsabilités", 
      icon: <Users className="text-blue-400" />,
      description: "Répartition équitable des tâches et décisions"
    },
    { 
      key: "communication", 
      label: "Communication", 
      icon: <MessageCircle className="text-green-400" />,
      description: "Ouverture, écoute active et expression claire des sentiments"
    },
    { 
      key: "compromise", 
      label: "Compromis et Ajustements", 
      icon: <Shuffle className="text-purple-400" />,
      description: "Capacité à trouver des solutions mutuellement satisfaisantes"
    },
    { 
      key: "mutualTrust", 
      label: "Confiance Mutuelle", 
      icon: <Lock className="text-pink-400" />,
      description: "Sentiment de sécurité et de fiabilité dans la relation"
    },
    { 
      key: "affection", 
      label: "Démonstration d'Affection", 
      icon: <Heart className="text-red-400" />,
      description: "Expressions physiques et verbales d'amour"
    }
  ];

  const giftOptions = [
    { key: "birthdayGifts", label: "Cadeaux d'anniversaire" },
    { key: "anniversaryGifts", label: "Cadeaux d'anniversaire de relation" },
    { key: "spontaneousGifts", label: "Cadeaux spontanés" },
    { key: "thoughtfulGifts", label: "Cadeaux réfléchis et personnalisés" }
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
    const criteriaValues = Object.values(notes);
    const giftBonus = Object.values(giftNotes)
      .filter(note => note === true)
      .length * 0.5;
    
    const totalNotes = criteriaValues.reduce((acc, note) => acc + note, 0);
    const averageNote = totalNotes / criteriaValues.length;
    
    return Math.min(5, averageNote + giftBonus).toFixed(2);
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
    <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center p-4" 
         style={{
           backgroundImage: 'url("/api/placeholder/1920/1080")',
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundBlend: 'overlay'
         }}>
      <div className="w-full max-w-4xl bg-gray-900 bg-opacity-95 rounded-2xl shadow-2xl overflow-hidden backdrop-blur">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6">
          <div className="flex items-center mb-4">
            <Heart className="w-8 h-8 mr-3 text-teal-400" />
            <h2 className="text-2xl font-bold">Évaluation de Relation</h2>
          </div>
          <p className="text-gray-400 text-sm">
            Évaluez objectivement différents aspects de votre relation pour obtenir un bilan détaillé.
          </p>
        </div>

        {/* Main Content */}
        <div className="p-6 grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {/* Criteria Section */}
            {criteriaDetails.map((criteria) => (
              <div key={criteria.key} 
                   className="bg-gray-800 p-4 rounded-lg shadow transition-all hover:shadow-lg hover:bg-gray-750">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">{criteria.icon}</div>
                  <div className="flex-grow">
                    <h3 className="font-medium text-gray-200">{criteria.label}</h3>
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

            {/* Gifts Section */}
            <div className="mt-6 bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center mb-4">
                <Gift className="text-amber-400 mr-2" />
                <h3 className="text-lg font-medium">Cadeaux et Surprises</h3>
              </div>
              <div className="space-y-3">
                {giftOptions.map((option) => (
                  <div key={option.key} className="flex items-center justify-between p-2 bg-gray-750 rounded">
                    <span className="text-gray-300">{option.label}</span>
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
                        <span className="ml-2">Oui</span>
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
                        <span className="ml-2">Non</span>
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
                <div className="text-5xl font-bold text-teal-400 mb-2">
                  {calculerNoteGlobale()}
                  <span className="text-xl text-gray-400">/5</span>
                </div>
                
                <div className="text-lg font-medium text-gray-200 mt-2">
                  {interpreterNote(parseFloat(calculerNoteGlobale()))}
                </div>
              </div>

              <p className="text-gray-400 text-sm">
                Cette évaluation est un guide pour vous aider à identifier les points forts 
                et les aspects à améliorer dans votre relation.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RelationshipAssessmentTool;