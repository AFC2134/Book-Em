const router = require('express').Router();
const { Calendar } = require('../../models')

router.get('/', (req, res) => {
    Calendar.findAll({
        attributes: [
            'id',
            'title',
            'date',
            'notes',
            'department_id'
        ]
    })
        .then(dbCalendarData => res.json(dbCalendarData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// router.post('/', (req, res) => {
//     Calendar.findOne({
//         where: {
//             date: req.body.date
//         },
//         attributes: [
//             'title',
//             'date',
//             'notes',
//             'department_id'
//         ]
//     })
//     .then(dbCalendarData => {
//         if (!dbCalendarData) {
//             res.status(404).json({ message: 'No post found with this id' });
//             return;
//         }
//         res.json(dbCalendarData);
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// })

router.post('/', (req, res) => {
    Calendar.create({ ...req.body })
        .then(dbCalendarData => {
            res.json(dbCalendarData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.put('/:id', (req, res) => {
    Calendar.update(
        {
            title: req.body.title,
            date: req.body.date,
            notes: req.body.notes,
            department_id: req.body.department_id
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbCalendarData => {
        if (!dbCalendarData) {
            res.status(404).json({ message: 'No calendar event found with this id' });
            return;
        }
        res.json(dbCalendarData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

router.delete('/:id', (req, res) => {
    Calendar.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbCalendarData => {
            if (!dbCalendarData) {
                res.status(404).json({ message: 'No calendar event found with this id' });
                return;
            }
            res.json(dbCalendarData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;