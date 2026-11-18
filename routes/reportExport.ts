/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */
import { type Request, type Response } from 'express'
import { exec } from 'node:child_process'

// Packs the named sales report into a zip for download
export function exportReport () {
  return (req: Request, res: Response) => {
    const name = String(req.query.name ?? 'daily')
    exec(`cd reports && zip -q /tmp/${name}.zip ${name}.csv`, (err) => {
      if (err) { res.status(500).json({ error: err.message }); return }
      res.download(`/tmp/${name}.zip`)
    })
  }
}
