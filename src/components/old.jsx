import React, { useState } from 'react';
import { 
  Heart, MessageCircle, Users, HandHeart, 
  Lock, Shuffle, Gift, CheckCircle, X,
  Package, Sparkles, ImagePlus
} from 'lucide-react';

const RelationshipAssessmentTool = () => {
  // Le reste du code reste identique, je change juste ImageIcon par ImagePlus
  const [notes, setNotes] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setBackgroundImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

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
    <div className="min-h-screen relative text-gray-100 flex flex-col">
      {/* Background with overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
          backgroundColor: backgroundImage ? 'transparent' : '#1e293b'
        }}
      >
        <div className="absolute inset-0 bg-indigo-900/40 backdrop-blur-sm"></div>
      </div>

      {/* Image upload button - Changed ImageIcon to ImagePlus */}
      <label className="absolute top-4 right-4 cursor-pointer z-10">
        <div className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-all rounded-lg px-4 py-2 backdrop-blur-sm">
          <ImagePlus className="w-5 h-5" />
          <span className="text-sm">Changer l'arrière-plan</span>
        </div>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
          className="hidden"
        />
      </label>

      <div className="relative flex-grow">
        <div className="max-w-4xl mx-auto p-4 md:p-6">
          <header className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              Évaluation de Relation
            </h1>
            <p className="text-lg text-gray-200">Analysez la qualité de votre relation à travers différents aspects</p>
          </header>

          <div className="grid gap-4 md:gap-6">
            {allCriteria.map((criteria) => (
              <div key={criteria.key} 
                   className="bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-6 transition-all hover:bg-white/15">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-pink-500/20 to-violet-500/20 rounded-lg text-pink-400 self-start">
                    {criteria.icon}
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium text-lg">{criteria.label}</h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-violet-500/20 text-violet-300">×{criteria.weight}</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-4">{criteria.description}</p>
                    
                    {criteria.type === "rating" ? (
                      <div className="flex flex-wrap gap-2">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <button
                            key={value}
                            onClick={() => handleChange(criteria.key, value)}
                            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all
                              ${notes[criteria.key] === value 
                                ? 'bg-gradient-to-r from-pink-500 to-violet-500 text-white' 
                                : 'bg-white/10 hover:bg-white/20'}`}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-3">
                        {[true, false].map((value) => (
                          <button
                            key={value.toString()}
                            onClick={() => handleChange(criteria.key, value)}
                            className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all
                              ${notes[criteria.key] === value
                                ? value 
                                  ? 'bg-gradient-to-r from-pink-500 to-violet-500 text-white'
                                  : 'bg-gray-500/50 text-white'
                                : 'bg-white/10 hover:bg-white/20'}`}
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
                ? 'bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white'
                : 'bg-white/10 text-gray-400 cursor-not-allowed'}`}
          >
            <CheckCircle className="w-5 h-5" />
            Voir les Résultats
          </button>
        </div>
      </div>

      <footer className="relative bg-black/20 backdrop-blur-sm mt-8 py-6 text-center text-gray-300">
        <p className="text-sm">
          © {new Date().getFullYear()} Outil d'Évaluation de Relation. Tous droits réservés.
        </p>
      </footer>

      {showResults && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-lg rounded-2xl max-w-md w-full p-8 relative">
            <button 
              onClick={() => setShowResults(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full animate-pulse"></div>
                <Heart className="w-16 h-16 absolute inset-0 m-auto text-white" />
              </div>
              
              <div className="mb-8">
                <div className="text-6xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent mb-2">
                  {calculateScore()}
                </div>
                <div className="text-xl text-gray-200">
                  {getInterpretation(parseFloat(calculateScore()))}
                </div>
              </div>

              <div className="text-sm text-gray-300 bg-white/5 rounded-lg p-4">
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