export const PROPHETESS_WHATSAPP = "2347026918232"
export const DOVE_WEBSITE = "dove.vercel.app"

export interface WhatsAppMessage {
  name?: string
  type: string
  details: string
  additionalInfo?: string
}

export const formatWhatsAppMessage = (data: WhatsAppMessage): string => {
  let message = "New Request from Dove Website:\n\n"

  if (data.name) {
    message += `Name: ${data.name}\n`
  }

  message += `Type: ${data.type}\n`
  message += `Details: ${data.details}\n`

  if (data.additionalInfo) {
    message += `Additional Info: ${data.additionalInfo}\n`
  }

  message += `\nSent via Dove Platform – ${DOVE_WEBSITE}`

  return encodeURIComponent(message)
}

export const openWhatsAppChat = (message?: string) => {
  const defaultMessage = "Hello Prophetess Blessing Ngozichukwu, I would like to make a request via Dove Platform."
  const finalMessage = message || defaultMessage
  const whatsappUrl = `https://wa.me/${PROPHETESS_WHATSAPP}?text=${encodeURIComponent(finalMessage)}`
  window.open(whatsappUrl, "_blank")
}

export const sendFormToWhatsApp = (formData: WhatsAppMessage) => {
  const message = formatWhatsAppMessage(formData)
  const whatsappUrl = `https://wa.me/${PROPHETESS_WHATSAPP}?text=${message}`
  window.open(whatsappUrl, "_blank")
}
