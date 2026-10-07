# Learner paths

`MentorPathwayStore` keeps one active path per account. Accepting a draft holds
the path row lock, verifies the profile and base revision, then snapshots the
outgoing revision's self-reported progress before removing milestones absent
from the replacement. Unchanged milestone IDs retain active progress. Changed
IDs start without completion. Revision snapshots are private to the account and
are returned by the paginated `GET /api/mentor/pathway/revisions` endpoint.

`ArchiveMentorPathProgress1791331200000` adds the nullable JSON snapshot column.
Older replaced revisions can have `null` because deleted progress cannot be
reconstructed. An empty array means the outgoing revision had no marked steps.
Deleting the workspace cascades through revisions and snapshots.

The client account overview reads `GET /api/mentor/pathway/summary` to show
whether a draft is ready and how many steps the learner marked done. This
account-scoped response is private and never cached.
