import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, RefreshCw } from "lucide-react";

import { Message } from "../OwnerPageElements";
import { formatAccountTime } from "../account-time";
import { useOwnerResource } from "../application/useOwnerResource";
import { parseQrStatistics } from "../owner-contracts";
import type { OwnerProfile, QrStatistics } from "../owner-api";

function Breakdown({
  title,
  values,
}: {
  title: string;
  values: Record<string, number>;
}) {
  const max = Math.max(1, ...Object.values(values));
  return (
    <section className="owner-card">
      <h2>{title}</h2>
      {Object.keys(values).length ? (
        <dl className="owner-breakdown">
          {Object.entries(values)
            .sort((a, b) => b[1] - a[1])
            .map(([label, count]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{count.toLocaleString()}</dd>
                <span
                  aria-hidden="true"
                  className="owner-bar"
                  style={{ width: `${(count / max) * 100}%` }}
                />
              </div>
            ))}
        </dl>
      ) : (
        <p className="owner-muted">No visits recorded in this period.</p>
      )}
    </section>
  );
}

export default function QrReportPanel({ profile }: { profile: OwnerProfile }) {
  const [days, setDays] = useState(profile.reportDays);
  const { data, error, retry } = useOwnerResource<QrStatistics>(
    `analytics?days=${days}`,
    parseQrStatistics
  );
  return (
    <>
      <div className="owner-admin-toolbar">
        <div className="owner-report-heading">
          <h2>QR report</h2>
          <p className="owner-muted">
            Visits through the coursework presentation’s QR link.
          </p>
        </div>
        <div className="owner-actions owner-report-controls">
          <label>
            Report period{" "}
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
            >
              {[7, 30, 90].map((n) => (
                <option key={n} value={n}>
                  Last {n} days
                </option>
              ))}
            </select>
          </label>
          <button className="owner-button" onClick={retry}>
            <RefreshCw size={14} aria-hidden="true" />
            Refresh
          </button>
        </div>
      </div>
      {error ? (
        <Message error>{error}</Message>
      ) : !data ? (
        <section className="owner-card" aria-busy="true">
          <p role="status">Loading QR statistics…</p>
        </section>
      ) : (
        <>
          <div className="owner-metrics">
            {[
              ["QR-link visits", data.total],
              ["Phone visits", data.devices.phone ?? 0],
              ["Tablet visits", data.devices.tablet ?? 0],
              ["Desktop visits", data.devices.desktop ?? 0],
            ].map(([label, count]) => (
              <section className="owner-card" key={label}>
                <p className="owner-muted">{label}</p>
                <p className="owner-metric">{count.toLocaleString()}</p>
              </section>
            ))}
          </div>
          {!data.total && (
            <section className="owner-card">
              <h2>Your first QR visit will appear here</h2>
              <p className="owner-muted">
                Once collection is enabled, open the page through its QR link.
                Refresh this report after about ten seconds.
              </p>
              {data.campaign === "esl10g-presentation-1" && (
                <Link
                  className="owner-text-link"
                  to="/coursework/ESL10G/presentation-1"
                >
                  Open presentation{" "}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              )}
            </section>
          )}
          <div className="owner-grid owner-grid--statistics">
            <Breakdown title="Devices" values={data.devices} />
            <Breakdown title="Operating systems" values={data.systems} />
            <Breakdown title="Browsers" values={data.browsers} />
            <section className="owner-card">
              <h2>Visits by day</h2>
              <p className="owner-muted">Dates grouped in UTC.</p>
              {Object.keys(data.daily).length ? (
                <div className="owner-table-scroll">
                  <table className="owner-table">
                    <thead>
                      <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Visits</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(data.daily)
                        .sort((a, b) => b[0].localeCompare(a[0]))
                        .map(([day, count]) => (
                          <tr key={day}>
                            <td>
                              <time dateTime={day}>{day}</time>
                            </td>
                            <td>{count.toLocaleString()}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="owner-muted">
                  No visits recorded in this period.
                </p>
              )}
            </section>
          </div>
          <section
            className="owner-card owner-report-details"
            aria-labelledby="qr-report-details-title"
          >
            <h2 id="qr-report-details-title">About this QR report</h2>
            <dl className="owner-details owner-report-metadata">
              <div>
                <dt>QR source</dt>
                <dd>
                  {data.campaign === "esl10g-presentation-1"
                    ? "ESL10G · Presentation 1"
                    : data.campaign || "Not specified"}
                </dd>
                {data.campaign === "esl10g-presentation-1" && (
                  <dd className="owner-muted">{data.campaign}</dd>
                )}
              </div>
              <div>
                <dt>Updated</dt>
                <dd>
                  <time dateTime={data.generatedAt}>
                    {formatAccountTime(data.generatedAt, profile)}
                  </time>
                </dd>
              </div>
            </dl>
            <p className="owner-muted">
              These are anonymous visits through this source’s QR link, not
              identified people or unique visitors. A shared link also counts;
              device categories are approximate.
            </p>
            <p className="owner-muted">
              The numbers above belong to this QR source. Reports for other QR
              sources should be kept separate.
            </p>
          </section>
        </>
      )}
    </>
  );
}
