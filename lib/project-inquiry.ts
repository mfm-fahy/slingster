export type ProjectInquiry = {
  name: string
  email: string
  projectType: string
  projectKind: string
  budget: string
  description: string
}

export type ProjectInquiryResult = { ok: true } | { ok: false; error: string }

// DEMO MODE — there is no backend/email service connected yet.
// While this is `true`, submission only simulates success so the UI flow can
// be reviewed. Set to `false` and wire `submitProjectInquiry` to a real
// endpoint (e.g. a server action, API route, or form provider) before launch.
const DEMO_MODE = true

export async function submitProjectInquiry(data: ProjectInquiry): Promise<ProjectInquiryResult> {
  if (!DEMO_MODE) {
    // TODO: connect to the real backend/email service here.
    // Example:
    // const res = await fetch('/api/inquiries', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // })
    // if (!res.ok) return { ok: false, error: 'Request failed. Please try again.' }
    // return { ok: true }
    void data
    return { ok: false, error: 'No backend configured.' }
  }

  await new Promise((resolve) => setTimeout(resolve, 1200))
  return { ok: true }
}
