const axios = require("axios");
const { ssl, url_database, puerto, chatIA_url, chate } = require("../config/server");


module.exports = async (req, res) =>
{
  const { id,language } = req.body;

 const lang = language.includes('es') ? 'es-ES': 'en-EN'

  const kyc = await axios.get(`${ssl}://${url_database}:${puerto}/database/Kyc?query=customer_id&value=${id}`)
  const risk_profile = await axios.get(`${ssl}://${url_database}:${puerto}/database/RiskProfile?query=customer_id&value=${id}`)
  const risk_score = await axios.get(`${ssl}://${url_database}:${puerto}/database/RiskScore?query=customer_id&value=${id}`)


  const kyc_questions = [{
    q: "¿Cuál es tu nombre?",
    a: kyc.data.data.first_name
  }, {
    q: "¿Cuál es tu apellido?",
    a: kyc.data.data.last_name
  }, {
    q: "¿Qué edad tienes?",
    a: kyc.data.data.age.toString()
  }, {
    q: "¿De que pais eres?",
    a: kyc.data.data.country_code
  }, {
    q: "¿Cuál es tu ocupación?",
    a: risk_profile.data.data.occupation
  }, {
    q: "¿Cuál es tu ingreso mensual?",
    a: risk_profile.data.data.onthly_income.toString()
  }, {
    q: "¿Qué tipo de ingreso tienes?",
    a: risk_profile.data.data.type_of_income
  }, {
    q: "¿Cuánto capital quieres invertir?",
    a: risk_profile.data.data.capital_willing_to_invest.toString()
  }, {
    q: "¿Cuál es el horizonte de inversión?",
    a: risk_profile.data.data.investment_horizon
  }, {
    q: "¿Cuál es el tu experiencia en inversiones?",
    a: risk_profile.data.data.investment_experience_level
  }, {
    q: "¿Estás dispuesto a aceptar pérdidas temporales en tus inversiones?",
    a: risk_profile.data.data.temporary_losses.toString()
  }, {
    q: "¿Prefieres buscar rentabilidades altas con posibles pérdidas temporales responde si o rentabilidades moderadas con menores pérdidas responde no?",
    a: risk_profile.data.data.high_or_moderate_returns
  }, {
    q: "¿Cuánto capital estás dispuesto a  perder?",
    a: risk_profile.data.data.capital_willing_to_lose + " %"
  }, {
    q: "¿Cuál es tu reacción ante la pérdida temporal?",
    a: risk_profile.data.data.temporary_loss_reaction
  }, {
    q: "¿Cuál es tu nivel de tolerancia al riesgo?",
    a: risk_profile.data.data.risk_tolerance
  }, {
    q: "¿Tienes intención de reinvertir tus ganancias?",
    a: risk_profile.data.data.reinvest_profits.toString()
  }, {
    q: "¿Cómo reaccionarías ante pérdidas temporales en tus inversiones?",
    a: risk_profile.data.data.temporary_loss_reaction
  }, {
    q: "¿Cuáles son tus objetivos financieros a largo plazo?",
    a: risk_profile.data.data.long_term_financial_goals
  }, {
    q: "¿Cuál es el máximo porcentaje de pérdida que aceptarías en un solo día?",
    a: risk_profile.data.data.max_loss_percentage_per_day
  }
    , {
    q: "¿Cuál es la divisa que vas a utilizar?",
    a: risk_profile.data.data.currencies
  }
  ]


  const model_chat = {
    user_info: {
      id: id,
      name: kyc.data.data.last_name
    },
    user_profile_questions: [...kyc_questions],
    user_portfolio: {
      profile: risk_score.data.data.profile,      
      max_drawdown: (risk_score.data.data.max_drawdown).toString(),
      stocks:  risk_score.data.data.stocks, 
      etfs:  risk_score.data.data.etfs,
      funds:  risk_score.data.data.funds,
    },
    chat_id: id,
    conversation_history: [],
    user_prompt: ""
  }

   const starChat = {
    id,
    language:lang,
    user_prompt: "",
    init:1,
    beta:0
  }
  console.log(starChat)
  const createDb = await axios.post(`${ssl}://${url_database}:${puerto}/Chat`, model_chat)
  const create = await axios.post(`${chatIA_url}/chat`, starChat)
  
  const model_chat_DB = {
    ...model_chat,
    conversation_history: [{ prompt: "", gpt: create.data }]
  }
  const updateDb = await axios.patch(`${ssl}://${url_database}:${puerto}/Chat`, model_chat_DB)
  return res.send(model_chat_DB)
}