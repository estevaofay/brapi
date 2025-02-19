import { getServerSession } from 'next-auth';

import Link from 'next/link';
import { SearchInput } from '~/components/SearchInput';
import { authOptions } from '~/pages/api/auth/[...nextauth]';

const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="bg-gray-900 pb-40 md:pb-20 relative min-w-full">
      <div className="absolute bg-brand-400/80 md:bg-brand-400/20 w-96 h-96 max-w-full blur-3xl rounded-full left-1/2 translate -translate-x-1/2 -translate-y-3/4 md:-left-48 md:-top-48 md:-translate-x-0 md:-translate-y-0 overflow-hidden z-10" />
      <div className="text-gray-400 bg-gray-900/70 body-font fixed w-full z-10 backdrop-blur-md">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
          <Link
            href="/"
            className="flex title-font font-medium items-center text-white mb-4 md:mb-0 w-20"
            tabIndex={0}
          >
            <span className="sr-only">brapi</span>
            <svg
              viewBox="0 0 661 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 mr-2 text-white"
            >
              <path
                d="M12 181.695V308.967H148.589C225.507 308.967 269.517 235.419 269.517 188.039V12H214.405L177.136 54.0273C55.8116 54.0273 12 121.231 12 181.695Z"
                fill="#7347ab"
              />
              <path
                d="M138.839 182.725C91.6433 143.325 20.9209 135.901 20.9209 135.901C15.4328 149.719 13.5475 158.642 12 176.343V308.967H151.959C169.198 307.864 178.414 305.847 193.986 299.649C193.986 299.649 186.035 222.126 138.839 182.725Z"
                fill="url(#paint0_linear)"
                fillOpacity="0.3"
              />
              <rect
                x="57.5957"
                y="180.704"
                width="38.8555"
                height="84.0547"
                fill="white"
              />
              <rect
                x="117.465"
                y="109.337"
                width="38.8555"
                height="155.422"
                fill="white"
              />
              <rect
                x="177.334"
                y="12.1982"
                width="38.8555"
                height="252.561"
                fill="white"
              />
              <path
                d="M395.845 172.594C395.845 185.062 393.267 194.648 388.11 201.352C382.954 208.055 375.688 211.406 366.313 211.406C358.579 211.406 352.345 208.336 347.61 202.195L346.626 210H325.392V102H349.087V140.039C353.493 135.023 359.188 132.516 366.173 132.516C375.642 132.516 382.954 135.914 388.11 142.711C393.267 149.508 395.845 159.07 395.845 171.398V172.594ZM372.079 171.117C372.079 163.805 371.095 158.602 369.126 155.508C367.204 152.367 364.228 150.797 360.196 150.797C354.853 150.797 351.149 152.836 349.087 156.914V187.148C351.103 191.18 354.853 193.195 360.337 193.195C365.915 193.195 369.454 190.477 370.954 185.039C371.704 182.367 372.079 177.727 372.079 171.117ZM452.376 155.367L444.571 154.805C437.118 154.805 432.337 157.148 430.228 161.836V210H406.532V133.922H428.751L429.524 143.695C433.509 136.242 439.063 132.516 446.188 132.516C448.72 132.516 450.923 132.797 452.798 133.359L452.376 155.367ZM501.665 210C500.821 208.453 500.071 206.18 499.415 203.18C495.056 208.664 488.962 211.406 481.134 211.406C473.962 211.406 467.868 209.25 462.853 204.938C457.837 200.578 455.329 195.117 455.329 188.555C455.329 180.305 458.376 174.07 464.47 169.852C470.563 165.633 479.423 163.523 491.048 163.523H498.36V159.516C498.36 152.531 495.337 149.039 489.29 149.039C483.665 149.039 480.853 151.805 480.853 157.336H457.157C457.157 149.977 460.274 144 466.509 139.406C472.79 134.812 480.782 132.516 490.485 132.516C500.188 132.516 507.853 134.883 513.478 139.617C519.103 144.352 521.985 150.844 522.126 159.094V192.773C522.22 199.758 523.298 205.102 525.36 208.805V210H501.665ZM486.829 194.531C489.782 194.531 492.22 193.898 494.142 192.633C496.11 191.367 497.517 189.938 498.36 188.344V176.18H491.47C483.22 176.18 479.095 179.883 479.095 187.289C479.095 189.445 479.821 191.203 481.274 192.562C482.728 193.875 484.579 194.531 486.829 194.531ZM605.938 172.523C605.938 184.336 603.267 193.781 597.923 200.859C592.626 207.891 585.454 211.406 576.407 211.406C569.423 211.406 563.681 208.852 559.181 203.742V239.25H535.485V133.922H557.634L558.337 140.953C562.884 135.328 568.86 132.516 576.267 132.516C585.642 132.516 592.931 135.984 598.134 142.922C603.337 149.812 605.938 159.305 605.938 171.398V172.523ZM582.243 171.047C582.243 157.547 578.306 150.797 570.431 150.797C564.806 150.797 561.056 152.812 559.181 156.844V186.797C561.243 191.016 565.04 193.125 570.571 193.125C578.118 193.125 582.009 186.609 582.243 173.578V171.047ZM641.446 210H617.681V133.922H641.446V210ZM616.274 114.305C616.274 110.93 617.493 108.164 619.931 106.008C622.368 103.852 625.532 102.773 629.423 102.773C633.313 102.773 636.478 103.852 638.915 106.008C641.353 108.164 642.571 110.93 642.571 114.305C642.571 117.68 641.353 120.445 638.915 122.602C636.478 124.758 633.313 125.836 629.423 125.836C625.532 125.836 622.368 124.758 619.931 122.602C617.493 120.445 616.274 117.68 616.274 114.305Z"
                fill="#fafafa"
              />
              <defs>
                <linearGradient
                  id="paint0_linear"
                  x1="102.993"
                  y1="135.901"
                  x2="102.993"
                  y2="308.967"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#7347ab" />
                  <stop offset="1" stopColor="white" stopOpacity="0.28" />
                </linearGradient>
              </defs>
            </svg>
          </Link>

          <SearchInput />

          <nav className="flex flex-wrap items-center text-base justify-center">
            <Link href="/about" className="mr-5 hover:text-white" tabIndex={0}>
              Sobre
            </Link>

            <Link
              prefetch={false}
              href="/docs"
              className="mr-5 hover:text-white"
              tabIndex={0}
            >
              Docs
            </Link>

            <Link
              href="/pricing"
              className="mr-5 hover:text-white"
              tabIndex={0}
            >
              Preços
            </Link>

            <Link
              prefetch={false}
              href="/faq"
              className="mr-5 hover:text-white"
              tabIndex={0}
            >
              FAQ
            </Link>

            <Link
              href="/contact"
              className="mr-5 hover:text-white"
              tabIndex={0}
            >
              Contato
            </Link>

            <Link
              prefetch={false}
              href="/dashboard"
              className="btn btn-primary hidden md:flex"
            >
              {session ? 'Dashboard' : 'Entrar'}
              {!session && (
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
