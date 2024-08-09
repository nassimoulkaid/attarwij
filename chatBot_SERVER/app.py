import os
import google.generativeai as genai
# FLASK server imports:
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import spacy
# RAG imports:
from fuzzywuzzy import fuzz

load_dotenv()
app = Flask(__name__)
CORS(app)  # Enable CORS 

#`os.getenv('GOOGLE_API_KEY')` to fetch an environment variable.
genai.configure(api_key=os.environ["GOOGLE_API_KEY"])
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 64,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}
data = {
    "company": {
      "description": "Chez Attarwij Agency, la satisfaction de nos clients est notre priorité absolue. Nous travaillons en étroite collaboration avec vous pour comprendre vos besoins spécifiques et développer des stratégies qui correspondent parfaitement à votre marque et à votre public cible. Faites le choix de la réussite en ligne avec Attarwij Agency. Contactez-nous dès aujourd'hui pour discuter de la façon dont nous pouvons faire croître votre entreprise ensemble!",
      "type": "text"
    },
    "services": [
      {
        "name": "Centre d'appel",
        "description": "Nous offrons des services de centre d'appel pour gérer vos communications avec les clients de manière professionnelle et efficace. Que ce soit pour le support client, la prise de commandes, ou des campagnes de télémarketing, notre équipe est formée pour répondre à vos besoins spécifiques.",
        "options": [
          {
            "name": "support client 24/7",
            "description": "Attarwij Agency offre un service client disponible 24 heures sur 24, 7 jours sur 7. Les clients peuvent contacter l'agence à tout moment pour obtenir de l'aide ou des informations."
          },
          {
            "name": "confirmation téléphonique",
            "description": "Ce service implique la vérification d'informations ou de rendez-vous par téléphone. Attarwij Agency peut appeler pour confirmer des détails importants avec les clients ou les partenaires."
          },
          {
            "name": "suivi personnalisé",
            "description": "Attarwij Agency assure un suivi individualisé avec chaque client. Cela peut inclure le suivi des demandes, des commandes ou des questions spécifiques, afin de garantir une satisfaction client maximale."
          },
          {
            "name": "assistance multilingue",
            "description": "Pour répondre aux besoins d'une clientèle diversifiée, Attarwij Agency offre un support dans plusieurs langues. Cela permet de communiquer efficacement avec des clients de différentes origines linguistiques."
          },
          {
            "name": "suivi des appels et analyse des données",
            "description": "L'agence surveille les appels entrants et sortants afin de recueillir des données pertinentes. Ces données sont ensuite analysées pour obtenir des insights utiles qui peuvent aider à améliorer les opérations ou les services client."
          },
          {
            "name": "gestion des appels entrants et sortants",
            "description": "Attarwij Agency prend en charge à la fois les appels entrants (des clients vers l'agence) et les appels sortants (de l'agence vers les clients ou partenaires). Cela garantit une gestion efficace des communications dans les deux sens."
          },
          {
            "name": "réponse rapide et personnalisée",
            "description": "On s'engage à fournir des réponses rapides et adaptées aux besoins spécifiques de chaque client. Cela contribue à une expérience client positive en répondant efficacement aux demandes et aux questions."
          }
        ],
        "type": "service"
      },
      {
        "name": "Marketing digital",
        "description": "Boostez votre visibilité en ligne et atteignez vos objectifs commerciaux grâce à nos stratégies de marketing digital. Nous offrons des solutions sur mesure pour améliorer votre présence sur les réseaux sociaux, optimiser votre site pour les moteurs de recherche, et lancer des campagnes publicitaires efficaces.",
        "options": [
          {
            "name": "marketing d'influence",
            "description": "C'est une stratégie où Attarwij collabore avec des influenceurs sur les réseaux sociaux pour promouvoir les produits ou services de ses clients. Les influenceurs ont une base de fans engagés qui peuvent être ciblés pour atteindre un public spécifique."
          },
          {
            "name": "stratégie de contenu et gestion des réseaux sociaux",
            "description": "Attarwij développe des stratégies de contenu pour ses clients, en créant du contenu pertinent et attractif sur les réseaux sociaux. Cela inclut la planification de publications, la gestion des interactions avec les abonnés et la gestion de la réputation en ligne."
          },
          {
            "name": "publicité en ligne (Google Ads, Facebook Ads)",
            "description": "Attarwij gère des campagnes publicitaires en ligne à travers des plateformes telles que Instagram, Facebook, Google. Ces campagnes visent à augmenter la visibilité et le trafic vers les projets des clients en utilisant des annonces payantes ciblées."
          },
          {
            "name": "SEO (optimisation pour les moteurs de recherche)",
            "description": "Attarwij optimise le contenu et la structure des sites web de ses clients pour améliorer leur classement dans les résultats des moteurs de recherche comme Google. Cela inclut l'optimisation des mots-clés, l'amélioration de la convivialité du site et la création de liens (backlinks)."
          },
          {
            "name": "marketing par courriel",
            "description": "Attarwij développe et exécute des campagnes de marketing par courriel ciblées. Cela inclut la création de listes de diffusion, la conception de courriels attrayants et pertinents, et l'analyse des performances des campagnes pour optimiser les taux d'ouverture et de conversion."
          },
          {
            "name": "analyse des performances et rapports détaillés",
            "description": "Attarwij surveille et analyse les performances de toutes les activités marketing numériques mises en œuvre pour ses clients. Des rapports détaillés sont fournis régulièrement, fournissant des insights précieux sur l'efficacité des stratégies et des campagnes."
          }
        ],
        "type": "service"
      },
      {
        "name": "Ventes",
        "description": "Augmentez vos revenus grâce à nos services de vente professionnels. Nous aidons à développer des stratégies de vente efficaces, à former vos équipes de vente, et à mettre en œuvre des processus qui améliorent la conversion et la fidélisation des clients.",
        "options": [
          {
            "name": "Prospection",
            "description": "Identification et ciblage de nouveaux prospects."
          },
          {
            "name": "Négociation et confirmation",
            "description": "Gestion des discussions et finalisation des détails de vente."
          },
          {
            "name": "Coordination des livraisons et techniques de vente adaptées",
            "description": "Organisation logistique des livraisons et adaptation des techniques de vente aux besoins spécifiques."
          },
          {
            "name": "Formation et coaching des équipes de vente",
            "description": "Programme de formation sur les techniques de vente et coaching pour améliorer les performances des équipes."
          },
          {
            "name": "Développement de stratégies de vente",
            "description": "Création de plans stratégiques pour atteindre les objectifs commerciaux à long terme."
          },
          {
            "name": "Gestion des relations clients (CRM)",
            "description": "Utilisation de systèmes CRM pour gérer efficacement les interactions et renforcer la fidélisation client."
          },
          {
            "name": "Analyse des données de vente",
            "description": "Évaluation des performances des ventes pour optimiser les stratégies commerciales."
          },
          {
            "name": "Techniques de vente avancées",
            "description": "Utilisation de méthodes sophistiquées comme la vente consultative pour améliorer les résultats de vente."
          }
        ],
        "type": "service"
      },
      {
        "name": "Création de site web",
        "description": "Faites briller votre entreprise en ligne avec un site web professionnel et attrayant. Nous concevons et développons des sites web sur mesure qui répondent à vos besoins spécifiques tout en offrant une expérience utilisateur exceptionnelle.",
        "options": [
          {
            "name": "Conception web personnalisée",
            "description": "Attarwij crée des sites web sur mesure en fonction des besoins spécifiques de chaque client. Cela inclut la conception graphique, l'architecture de l'information et l'ergonomie du site pour assurer une expérience utilisateur optimale."
          },
          {
            "name": "Développement de sites responsives",
            "description": "Les sites développés par Attarwij sont conçus pour être compatibles avec tous les appareils (ordinateurs de bureau, tablettes, smartphones). Cela garantit une accessibilité maximale et une navigation fluide quel que soit le dispositif utilisé par l'utilisateur."
          },
          {
            "name": "Intégration de systèmes de gestion de contenu (CMS)",
            "description": "Attarwij intègre des CMS pour permettre aux clients de gérer facilement le contenu de leur site web. Cela inclut la création de modèles personnalisés et l'installation de fonctionnalités spécifiques selon les besoins du client."
          },
          {
            "name": "Optimisation pour les moteurs de recherche (SEO)",
            "description": "L'agence optimise le contenu et la structure des sites web pour améliorer leur visibilité dans les résultats des moteurs de recherche comme Google. Cela comprend l'utilisation de mots-clés pertinents, l'optimisation des balises HTML, l'amélioration de la vitesse de chargement du site, et la création de liens (backlinks)."
          },
          {
            "name": "Maintenance et mises à jour régulières",
            "description": "Attarwij assure la maintenance continue des sites web, y compris la résolution de problèmes techniques, la sauvegarde régulière des données et la mise à jour des logiciels et des plugins. Cette gestion proactive garantit que les sites restent sécurisés, fonctionnels et à jour avec les dernières normes et exigences technologiques."
          }
        ],
        "type": "service"
      },
      {
        "name": "Création de contenu",
        "description": "Attirez et engagez votre audience avec du contenu de haute qualité. Nos services de création de contenu incluent la rédaction de textes, la production de vidéos, la création de visuels, et bien plus encore, pour renforcer votre message et augmenter votre portée.",
        "options": [
          {
            "name": "Stratégie de contenu et planification éditoriale",
            "description": "Attarwij développe des stratégies de contenu sur mesure pour ses clients, en alignant les objectifs commerciaux avec les besoins et les intérêts de leur public cible. Cela inclut la planification de calendriers éditoriaux pour assurer une cohérence et une pertinence constantes du contenu."
          },
          {
            "name": "Rédaction d'articles et de blogs",
            "description": "L'agence rédige des articles et des blogs optimisés pour le référencement (SEO), fournissant un contenu informatif et engageant qui attire et informe le public tout en renforçant l'autorité et la crédibilité de chaque entreprise cliente."
          },
          {
            "name": "Shooting et photographie professionnelle",
            "description": "Attarwij organise des séances de prise de vue professionnelle pour produire des images de haute qualité qui captent l'attention et renforcent la présence visuelle de chaque entreprise cliente."
          },
          {
            "name": "Création de vidéos et animations",
            "description": "L'agence crée des vidéos et des animations attirantes pour promouvoir les produits, expliquer des concepts complexes, ou simplement divertir et engager le public cible."
          },
          {
            "name": "Design graphique et création de visuels",
            "description": "Attarwij réalise des designs graphiques attrayants et efficaces, que ce soit pour des publications sur les réseaux sociaux, des infographies, des bannières publicitaires, ou d'autres supports visuels nécessaires à la stratégie de communication d'une entreprise."
          },
          {
            "name": "Contenu pour les réseaux sociaux",
            "description": "L'agence développe du contenu adapté aux plateformes de réseaux sociaux, telles que des posts, des stories, des vidéos courtes, et d'autres formats pour maximiser l'engagement et interagir de manière efficace avec la communauté en ligne."
          }
        ],
        "type": "service"
      }
    ],
    "contact": {
      "phone": "+2127 81456887",
      "email": "attarwijagency@gmail.com",
      "address": "N195 quartier el mansour, Meknes 50000",
      "type": "contact"
    }
}
model =  genai.GenerativeModel(
   'gemini-1.5-flash',
   generation_config=generation_config,
   system_instruction=f"you're a chatbot at ATTARWIJ AGENCY, help users in a friendly way and answer their questions based on this json code: {data}.Try to summorize and structure the answer to make it simple and easier for the users to understand clearly",
)
"""
      if a model got exhausted, replace it with one of these : 
                     °gemini-1.5-flash
                     °gemini-1.0-pro
                     °gemini-1.5-pro

"""
# saving conversation in history for a better flow
chat_session = model.start_chat(
    history=[]
)

# RAG implementation :
"""--------------------------- """
#manipulate the user question with data file
def fetch_gemini_answer(user_question, data):
    # Construct a prompt for Gemini
    prompt = f"User question: {user_question}\n\nWebsite data: {data}\n\nProvide a comprehensive and informative answer to the user's query based on the provided website data."

    try:
        response = genai.generate_text(prompt)
        gemini_answer = response.text
        return gemini_answer
    except Exception as e:
        print(f"Error fetching Gemini answer: {e}")
        return ""  # Or handle the error appropriately

#manipulate gemini response to the data 
def process_gemini_output(gemini_answer):
    nlp = spacy.load("en_core_web_sm")  # Load a spaCy model
    doc = nlp(gemini_answer)

    # Extract keywords and entities
    entities = [entity.text for entity in doc.ents]
    keywords = [token.text for token in doc if token.is_stop == False and token.is_alpha]
    
    return keywords + entities

#redefine the keywords from the user message and gemini response
def query_json_data(extracted_keywords, data):
    relevant_data = {}
    for keyword in extracted_keywords:
        for key, value in data.items():
            if fuzz.ratio(keyword.lower(), str(value).lower()) > 70:
                relevant_data[key] = value
    return relevant_data

#give a proper answer to the user
def generate_response(gemini_answer, relevant_content):
    # Combine Gemini answer and relevant content
    response = f"Gemini answer: {gemini_answer}\n\nRelevant information from website: {relevant_content}"
    return response.format(gemini_answer, relevant_content)

"""--------------------------- """


# Define the route for getting a response from the chatbot:
@app.route('/get_response', methods=['GET'])
def get_response():
  user_question = request.args.get('question')
  if not user_question:
    return jsonify({'error': 'Missing question parameter'}), 400
  try:
      response = chat_session.send_message(user_question)
      response_text = response.text # gemini reponse exact

      return jsonify({'response': response_text})
  except Exception as e:
      print(f"Error generating content: {e}")
      return jsonify({'error': 'An error occurred'}), 500


# Run the Flask app:
if __name__ == '__main__':
  app.run(debug=True)