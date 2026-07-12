import type { Mentor } from "@/data/mentors";
import { formatPrice } from "@/lib/mentor-match";
import { FallbackImage } from "@/components/ui/FallbackImage";
import { StarRating } from "@/components/mentors/StarRating";

export function MentorCard({
  mentor,
  onBook,
}: {
  mentor: Mentor;
  onBook: () => void;
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-card border border-line bg-white p-5.5 shadow-[0_2px_6px_rgba(11,18,32,0.04)] transition-shadow duration-200 hover:shadow-[0_18px_40px_-18px_rgba(11,18,32,0.22)] sm:p-6">
      <div className="flex items-start gap-3.5">
        <div className="relative h-15 w-15 shrink-0 overflow-hidden rounded-full border border-line">
          <FallbackImage
            src={mentor.photoSrc}
            alt={mentor.photoAlt}
            className="object-cover"
            sizes="60px"
          />
        </div>
        <div className="min-w-0">
          <h3 className="truncate font-display text-base font-bold leading-snug text-ink">
            {mentor.name}
          </h3>
          <p className="mt-0.5 truncate font-body text-[13px] text-sub">
            {mentor.program}
          </p>
          <p className="truncate font-body text-[13px] text-sub">
            {mentor.university}
          </p>
        </div>
      </div>

      <p className="mt-4 line-clamp-2 font-body text-[13.5px] leading-relaxed text-sub">
        {mentor.bio}
      </p>

      <div className="mt-3.5 flex flex-wrap gap-1.5">
        {mentor.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-pill border border-line bg-soft px-2.5 py-1 font-label text-[10.5px] font-semibold tracking-[0.04em] text-ink"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-4.5">
        <div className="flex items-center justify-between border-t border-line pt-4">
          <div>
            <StarRating rating={mentor.rating} reviewCount={mentor.reviewCount} />
            <div className="mt-1 font-display text-[15px] font-bold text-ink">
              {formatPrice(mentor.price)}
            </div>
          </div>
          <button
            type="button"
            onClick={onBook}
            className="rounded-button bg-blue px-4 py-2.25 font-body text-sm font-semibold text-white shadow-[0_8px_20px_rgba(30,79,255,0.28)] transition-transform duration-150 hover:-translate-y-0.5"
          >
            Book session
          </button>
        </div>
      </div>
    </div>
  );
}
