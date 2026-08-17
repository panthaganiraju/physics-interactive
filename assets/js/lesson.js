/* =========================================================
   INTERACTIVE ENGINEERING PHYSICS
   COMMON JAVASCRIPT ENGINE

   This file is intentionally lightweight.

   It provides:
   - smooth navigation
   - active navigation state
   - keyboard accessibility
   - common lesson utilities
   - future support for lessons,
     simulations and quizzes

   Individual lesson pages can use
   these functions without duplicating
   the entire JavaScript system.
   ========================================================= */


/* =========================================================
   DOCUMENT READY
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initialiseNavigation();

        initialiseSmoothLinks();

        initialiseKeyboardSupport();

    }
);


/* =========================================================
   NAVIGATION
   ========================================================= */

function initialiseNavigation() {

    const links =
        document.querySelectorAll(
            ".main-nav a"
        );


    if (!links.length) {

        return;

    }


    links.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    links.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    link.classList.add(
                        "active"
                    );

                }
            );

        }
    );

}


/* =========================================================
   SMOOTH INTERNAL LINKS
   ========================================================= */

function initialiseSmoothLinks() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const targetID =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        targetID === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetID
                        );


                    if (!target) {

                        return;

                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        }
    );

}


/* =========================================================
   KEYBOARD SUPPORT
   ========================================================= */

function initialiseKeyboardSupport() {

    document.addEventListener(
        "keydown",
        function (event) {

            /*
               Escape can return focus
               to the main content.
            */

            if (
                event.key === "Escape"
            ) {

                const main =
                    document.querySelector(
                        "main"
                    );


                if (main) {

                    main.focus();

                }

            }

        }
    );

}


/* =========================================================
   SCROLL TO TOP
   ========================================================= */

function scrollToTop() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================================================
   LESSON UTILITY
   =========================================================

   Future lesson pages can call:

       showLessonMessage("Correct!");

   ========================================================= */

function showLessonMessage(
    message,
    type = "info"
) {

    const existing =
        document.querySelector(
            ".lesson-message"
        );


    if (existing) {

        existing.remove();

    }


    const box =
        document.createElement(
            "div"
        );


    box.className =
        "lesson-message " +
        type;


    box.textContent =
        message;


    document.body.appendChild(
        box
    );


    setTimeout(
        function () {

            box.classList.add(
                "show"
            );

        },
        20
    );


    setTimeout(
        function () {

            box.classList.remove(
                "show"
            );


            setTimeout(
                function () {

                    box.remove();

                },
                300
            );

        },
        3000
    );

}


/* =========================================================
   SAVE PROGRESS
   =========================================================

   Uses browser localStorage.

   No login/database required.

   Example:

       saveTopicProgress(
           "unit1",
           "de-broglie"
       );

   ========================================================= */

function saveTopicProgress(
    unit,
    topic
) {

    const key =
        "physics-progress";


    let progress =
        JSON.parse(
            localStorage.getItem(
                key
            )
        ) || {};


    if (!progress[unit]) {

        progress[unit] = {};

    }


    progress[unit][topic] =
        true;


    localStorage.setItem(
        key,
        JSON.stringify(
            progress
        )
    );

}


/* =========================================================
   CHECK TOPIC PROGRESS
   ========================================================= */

function isTopicCompleted(
    unit,
    topic
) {

    const progress =
        JSON.parse(
            localStorage.getItem(
                "physics-progress"
            )
        ) || {};


    return !!(
        progress[unit] &&
        progress[unit][topic]
    );

}


/* =========================================================
   CLEAR ALL PROGRESS
   ========================================================= */

function clearLearningProgress() {

    localStorage.removeItem(
        "physics-progress"
    );

}


/* =========================================================
   LESSON COMPLETION
   ========================================================= */

function completeTopic(
    unit,
    topic
) {

    saveTopicProgress(
        unit,
        topic
    );


    showLessonMessage(
        "Topic completed ✓",
        "success"
    );

}


/* =========================================================
   SIMPLE UTILITY
   ========================================================= */

function clamp(
    value,
    minimum,
    maximum
) {

    return Math.min(
        Math.max(
            value,
            minimum
        ),
        maximum
    );

}
