export type ProjectInquiry = {
  name: string
  email: string
  projectType: string
  projectKind: string
  budget: string
  description: string
}

export type ProjectInquiryResult = { ok: true } | { ok: false; error: string }

const WEB3FORMS_ACCESS_KEY = '8a99f4ca-583f-4f85-898f-8b631738926b'
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

export async function submitProjectInquiry(data: ProjectInquiry): Promise<ProjectInquiryResult> {
  try {
    const formBody = new URLSearchParams({
      access_key: WEB3FORMS_ACCESS_KEY,
      name: data.name,
      email: data.email,
      project_type: data.projectType,
      project_kind: data.projectKind,
      budget: data.budget,
      message: data.description,
    })
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: formBody,
    })
    const body = (await res.json()) as { success?: boolean; message?: string }
    if (!res.ok || body.success !== true) {
      return { ok: false, error: body.message || 'Request failed. Please try again.' }
    }
    return { ok: true }
  } catch {
    return { ok: false, error: 'Network error. Please try again.' }
  }
}
