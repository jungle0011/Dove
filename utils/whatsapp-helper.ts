export const PROPHETESS_WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2347026918232"
export const DOVE_WEBSITE = process.env.NEXT_PUBLIC_WEBSITE_URL || "the-graced-dove.vercel.app"

export interface WhatsAppMessage {
  name?: string
  type: string
  details: string
  additionalInfo?: string
}

// Input sanitization function
const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .trim()
    .substring(0, 1000) // Limit length
}

export const formatWhatsAppMessage = (data: WhatsAppMessage): string => {
  // Sanitize all inputs
  const sanitizedData = {
    name: data.name ? sanitizeInput(data.name) : undefined,
    type: sanitizeInput(data.type),
    details: sanitizeInput(data.details),
    additionalInfo: data.additionalInfo ? sanitizeInput(data.additionalInfo) : undefined,
  }

  let message = "New Request from The Graced Dove Prophetic Voice Website:\n\n"

  if (sanitizedData.name) {
    message += `Name: ${sanitizedData.name}\n`
  }

  message += `Type: ${sanitizedData.type}\n`
  message += `Details: ${sanitizedData.details}\n`

  if (sanitizedData.additionalInfo) {
    message += `Additional Info: ${sanitizedData.additionalInfo}\n`
  }

  message += `\nSent via The Graced Dove Prophetic Voice Platform – ${DOVE_WEBSITE}`

  return encodeURIComponent(message)
}

export const openWhatsAppChat = (message?: string) => {
  const defaultMessage = "Hello Prophetess Blessing Ngozichukwu, I would like to make a request via The Graced Dove Prophetic Voice Platform."
  const finalMessage = message ? sanitizeInput(message) : defaultMessage
  const whatsappUrl = `https://wa.me/${PROPHETESS_WHATSAPP}?text=${encodeURIComponent(finalMessage)}`
  window.open(whatsappUrl, "_blank", "noopener,noreferrer")
}

export const sendFormToWhatsApp = (formData: WhatsAppMessage) => {
  const message = formatWhatsAppMessage(formData)
  const whatsappUrl = `https://wa.me/${PROPHETESS_WHATSAPP}?text=${message}`
  window.open(whatsappUrl, "_blank", "noopener,noreferrer")
}
