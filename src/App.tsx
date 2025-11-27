import { AmountInput } from '@alfalab/core-components/amount-input/cssm';
import { Button } from '@alfalab/core-components/button/cssm';
import { Collapse } from '@alfalab/core-components/collapse/cssm';
import { Divider } from '@alfalab/core-components/divider/cssm';
import { Gap } from '@alfalab/core-components/gap/cssm';
import { PureCell } from '@alfalab/core-components/pure-cell/cssm';
import { Slider } from '@alfalab/core-components/slider/cssm';
import { Steps } from '@alfalab/core-components/steps/cssm';
import { Switch } from '@alfalab/core-components/switch/cssm';
import { Tag } from '@alfalab/core-components/tag/cssm';
import { Typography } from '@alfalab/core-components/typography/cssm';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { ChevronLeftMIcon } from '@alfalab/icons-glyph/ChevronLeftMIcon';
import { ChevronUpMIcon } from '@alfalab/icons-glyph/ChevronUpMIcon';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import fileImg from './assets/file.png';
import hb from './assets/hb.png';
import houseImg from './assets/house.png';
import rubIcon from './assets/rub.svg';
import { LS, LSKeys } from './ls';
import { appSt } from './style.css';
import { ThxLayout } from './thx/ThxLayout';
import { formatWord } from './utils/words';

const SLIDER_SUM = {
  default: 500_000,
  min: 1_000,
  max: 10_000_000,
  step: 1_000,
};

const termToPercentMap: Record<number, number> = {
  6: 0.1801,
  12: 0.165,
  24: 0.136,
};

const chipsPeriod = [6, 12, 24];

const faqs = [
  {
    question: 'Есть ли комиссия?',
    answer: ['Нет, вы ничего дополнительно не платите.'],
  },
  {
    question: 'Как выплачивается доход?',
    answer: ['Он начисляется на дебетовый или брокерский счёт.'],
  },
  {
    question: 'Есть ли налог?',
    answer: ['Налоги как в облигациях'],
  },
  {
    question: 'Можно ли вывести деньги до конца срока?',
    answer: ['Можно. Но тогда доход не начислится.'],
  },
];

const chipsData = [10000, 36000, 50000, 72000];

const LINK = 'alfabank://longread?endpoint=v1/adviser/longreads/79127';

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [thxShow] = useState(LS.getItem(LSKeys.ShowThx, false));
  const [sliderSum, setSliderSum] = useState(SLIDER_SUM.default);
  const [sliderTerm, setSliderTerm] = useState(12);
  const [collapsedItems, setCollapsedItem] = useState<string[]>([]);
  const [step, setStep] = useState<'step1' | 'step2'>('step1');
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState(false);
  const [sum2, setSum2] = useState(100_000);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!LS.getItem(LSKeys.UserId, null)) {
      LS.setItem(LSKeys.UserId, Date.now());
    }
  }, []);

  const incomeProfitWithSum = Math.floor(((sliderSum * termToPercentMap[sliderTerm]) / 12) * sliderTerm);

  const submit = () => {
    setLoading(true);

    // sendDataToGA({
    //   autopayments: Number(checked) as 1 | 0,
    //   limit: Number(checked2) as 1 | 0,
    //   limit_sum: limit ?? 0,
    //   insurance: Number(checked3) as 1 | 0,
    //   email: email ? 1 : 0,
    // }).then(() => {
    //   LS.setItem(LSKeys.ShowThx, true);
    //   setThx(true);
    //   setLoading(false);
    // });
    LS.setItem(LSKeys.ShowThx, true);
    window.location.replace(LINK);
    setLoading(false);
  };

  const handleChangeInput = (
    _: React.ChangeEvent<HTMLInputElement> | null,
    payload: {
      value: number | null;
      valueString: string;
    },
  ) => {
    if (error) {
      setError('');
    }

    setSliderSum(payload.value ?? 0);
  };

  const handleChangeInput2 = (
    _: React.ChangeEvent<HTMLInputElement> | null,
    payload: {
      value: number | null;
      valueString: string;
    },
  ) => {
    setSum2(payload.value ?? 0);
  };

  if (thxShow) {
    return <ThxLayout />;
  }

  if (step === 'step2') {
    return (
      <>
        <div className={appSt.container}>
          <Typography.TitleResponsive style={{ marginTop: '1rem' }} tag="h1" view="medium" font="system" weight="bold">
            Гарантированный доход
          </Typography.TitleResponsive>
          <Typography.Text view="primary-medium">
            Ваши деньги приносят доход. Условия и ставка не меняется весь срок
          </Typography.Text>

          <div style={{ marginTop: '12px' }}>
            <AmountInput
              label="Сколько"
              labelView="outer"
              value={sliderSum}
              error={error}
              onChange={handleChangeInput}
              block
              minority={1}
              bold={false}
              min={SLIDER_SUM.min}
              max={SLIDER_SUM.max}
              positiveOnly
              integersOnly
              onBlur={() => {
                if (sliderSum < SLIDER_SUM.min) {
                  setSliderSum(SLIDER_SUM.min);
                } else if (sliderSum > SLIDER_SUM.max) {
                  setSliderSum(SLIDER_SUM.max);
                }
              }}
            />
          </div>

          <div>
            <Swiper style={{ marginLeft: '0' }} spaceBetween={8} slidesPerView="auto">
              {chipsData.map(chip => (
                <SwiperSlide key={chip} style={{ maxWidth: 'min-content' }}>
                  <Tag
                    size={32}
                    view="filled"
                    shape="rectangular"
                    checked={chip === sliderSum}
                    onClick={() => setSliderSum(chip)}
                  >
                    <Typography.Text view="primary-small">{chip.toLocaleString('ru')} ₽</Typography.Text>
                  </Tag>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div>
            <Typography.Text view="primary-small" color="secondary">
              На какой срок
            </Typography.Text>
            <Gap size={8} />
            <Swiper style={{ marginLeft: '0' }} spaceBetween={8} slidesPerView="auto">
              {chipsPeriod.map(chip => (
                <SwiperSlide key={chip} style={{ maxWidth: 'min-content' }}>
                  <Tag
                    size={40}
                    view="filled"
                    shape="rectangular"
                    checked={chip === sliderTerm}
                    onClick={() => setSliderTerm(chip)}
                  >
                    <Typography.Text view="primary-medium">
                      {formatWord(chip, ['месяц', 'месяца', 'месяцев'])}
                    </Typography.Text>
                  </Tag>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div>
            <Typography.Text view="primary-small" color="secondary">
              Ваша ставка
            </Typography.Text>
            <Gap size={8} />
            <Typography.TitleResponsive tag="h4" view="xsmall" font="system" weight="medium">
              {(termToPercentMap[sliderTerm] * 100).toLocaleString('ru')}%
            </Typography.TitleResponsive>
          </div>

          <div>
            <Switch
              block={true}
              reversed={true}
              checked={selected}
              label={
                <Typography.Text color="primary" weight="medium" view="primary-medium">
                  Перевести со вклада
                </Typography.Text>
              }
              hint={
                <Typography.Text color="primary" view="primary-small">
                  Деньги зачислятся, когда вклад закроется
                </Typography.Text>
              }
              onChange={() => setSelected(!selected)}
            />
          </div>

          <Collapse expanded={selected}>
            <div>
              <Typography.Text view="primary-small" color="secondary" tag="p" defaultMargins={false}>
                Счёт вклада
              </Typography.Text>

              <div className={appSt.bannerAccount}>
                <img src={rubIcon} width={76} height={48} alt="rubIcon" />

                <Typography.Text view="primary-small">Альфа-Вклад</Typography.Text>
              </div>
            </div>

            <div style={{ marginTop: '12px' }}>
              <AmountInput
                label="Сколько"
                labelView="outer"
                value={sum2}
                error={error}
                onChange={handleChangeInput2}
                block
                minority={1}
                bold={false}
                min={1000}
                max={1_000_000}
                positiveOnly
                integersOnly
                disabled={checked}
                onBlur={() => {
                  if (sum2 < 1_000) {
                    setSum2(1_000);
                  } else if (sum2 > 100_000_000) {
                    setSum2(100_000_000);
                  }
                }}
              />
            </div>

            <div style={{ marginTop: '12px' }}>
              <Swiper style={{ marginLeft: '0' }} spaceBetween={8} slidesPerView="auto">
                <SwiperSlide style={{ maxWidth: 'min-content' }}>
                  <Tag size={32} view="filled" shape="rectangular" checked={checked} onClick={() => setChecked(!checked)}>
                    <Typography.Text view="primary-small">Перевести всё</Typography.Text>
                  </Tag>
                </SwiperSlide>
              </Swiper>
            </div>
          </Collapse>
        </div>
        <Gap size={96} />

        <div className={appSt.bottomBtn}>
          <Button
            view="secondary"
            size={56}
            style={{ minWidth: 56, maxWidth: 56 }}
            onClick={() => {
              setStep('step1');
            }}
          >
            <ChevronLeftMIcon />
          </Button>
          <Button block view="primary" size={56} onClick={submit}>
            Продолжить
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={appSt.container}>
        <div className={appSt.box}>
          <Typography.TitleResponsive tag="h1" view="large" font="system" weight="semibold">
            Надежный доход
          </Typography.TitleResponsive>
          <Typography.Text view="primary-small" color="secondary">
            Деньги со счета инвестируются в облигации, обеспеченные платежами по потребительским кредитам Альфа Банка
          </Typography.Text>

          <img src={hb} alt="hb" width="100%" height={133} style={{ objectFit: 'contain' }} />
        </div>

        <Typography.TitleResponsive style={{ marginTop: '12px' }} tag="h3" view="small" font="system" weight="semibold">
          Преимущества
        </Typography.TitleResponsive>

        <PureCell>
          <PureCell.Graphics verticalAlign="center">
            <img src={houseImg} width={48} height={48} alt="house" />
          </PureCell.Graphics>
          <PureCell.Content>
            <PureCell.Main>
              <Typography.TitleResponsive tag="h4" view="xsmall" font="system" weight="semibold">
                Гибкие сроки
              </Typography.TitleResponsive>

              <Typography.Text view="primary-small" color="secondary">
                от 6 до 24 месяцев — выбираете сами
              </Typography.Text>
            </PureCell.Main>
          </PureCell.Content>
        </PureCell>
        <PureCell>
          <PureCell.Graphics verticalAlign="center">
            <img src={fileImg} width={48} height={48} alt="file" />
          </PureCell.Graphics>
          <PureCell.Content>
            <PureCell.Main>
              <Typography.TitleResponsive tag="h4" view="xsmall" font="system" weight="semibold">
                Лёгкий старт
              </Typography.TitleResponsive>

              <Typography.Text view="primary-small" color="secondary">
                Начать можно с 1000 ₽
              </Typography.Text>
            </PureCell.Main>
          </PureCell.Content>
        </PureCell>

        <Typography.TitleResponsive style={{ marginTop: '12px' }} tag="h3" view="small" font="system" weight="semibold">
          Сравните
        </Typography.TitleResponsive>

        <div className={appSt.boxTable}>
          <div className={appSt.boxTableCell()}>
            <Typography.Text view="primary-small" weight="bold" style={{ marginBottom: '12px' }}>
              Депозит
            </Typography.Text>
            <Typography.Text view="secondary-medium">До 16% годовых</Typography.Text>
            <Divider />
            <Typography.Text view="secondary-medium">Страхование АСВ</Typography.Text>
          </div>
          <div className={appSt.boxTableCell({ filled: true })}>
            <Typography.Text view="primary-small" weight="bold" style={{ marginBottom: '12px' }}>
              Квазидепозит
            </Typography.Text>
            <Typography.Text view="secondary-medium">До 19% годовых</Typography.Text>
            <Divider />
            <Typography.Text view="secondary-medium">Не застраховано</Typography.Text>
          </div>
        </div>

        <Typography.TitleResponsive style={{ marginTop: '12px' }} tag="h3" view="small" font="system" weight="semibold">
          Как это работает
        </Typography.TitleResponsive>

        <Steps isVerticalAlign={true} interactive={false} className={appSt.stepStyle}>
          <span>
            <Typography.Text tag="p" defaultMargins={false} view="component-primary">
              Формируйте отложенный перевод
            </Typography.Text>
            <Typography.Text view="primary-small" color="secondary">
              После окончания вклада деньги автоматически переведутся
            </Typography.Text>
          </span>
          <span>
            <Typography.Text tag="p" defaultMargins={false} view="component-primary">
              Мы размещаем их
            </Typography.Text>
            <Typography.Text view="primary-small" color="secondary">
              Инвестируем в надёжные краткосрочные облигации и депозиты
            </Typography.Text>
          </span>
          <span>
            <Typography.Text tag="p" defaultMargins={false} view="component-primary">
              Получаете доход
            </Typography.Text>
            <Typography.Text view="primary-small" color="secondary">
              Проценты начисляются ежедневно на ваш счёт
            </Typography.Text>
          </span>
        </Steps>

        <Typography.TitleResponsive style={{ marginTop: '12px' }} tag="h3" view="small" font="system" weight="semibold">
          Расчитайте доход
        </Typography.TitleResponsive>

        <div className={appSt.boxCalc}>
          <div>
            <div className={appSt.rowSb}>
              <Typography.Text view="primary-medium" color="secondary">
                Сумма инвестиций
              </Typography.Text>
              <Typography.Text view="primary-medium" weight="medium">
                {sliderSum.toLocaleString('ru')} ₽
              </Typography.Text>
            </div>
            <div style={{ marginTop: '12px' }}>
              <Slider
                size={4}
                value={sliderSum}
                step={SLIDER_SUM.step}
                min={SLIDER_SUM.min}
                max={SLIDER_SUM.max}
                onChange={({ value }) => setSliderSum(value)}
              />
            </div>
          </div>

          <div>
            <div className={appSt.rowSb}>
              <Typography.Text view="primary-medium" color="secondary">
                Срок
              </Typography.Text>
              <Typography.Text view="primary-medium" weight="medium">
                {formatWord(sliderTerm, ['месяц', 'месяца', 'месяцев'])}
              </Typography.Text>
            </div>
            <div style={{ marginTop: '12px' }}>
              <Slider
                size={4}
                value={sliderTerm}
                pips={{
                  mode: 'values',
                  values: [6, 12, 24],
                  stepped: true,
                }}
                snap
                range={{ min: 6, '50%': 12, max: 24 }}
                onChange={({ value }) => setSliderTerm(value)}
              />
            </div>
          </div>

          <div className={appSt.rowSb}>
            <Typography.Text view="primary-medium" color="secondary">
              Потенциальный доход
            </Typography.Text>
            <Typography.Text view="primary-medium" weight="medium">
              {incomeProfitWithSum.toLocaleString('ru')} ₽
            </Typography.Text>
          </div>
        </div>

        <Typography.Text view="secondary-large" color="secondary">
          Расчёт дохода примерный, деньги можно снять в любой момент
        </Typography.Text>

        <Typography.TitleResponsive style={{ marginTop: '12px' }} tag="h3" view="small" font="system" weight="semibold">
          Дополнительные вопросы
        </Typography.TitleResponsive>

        {faqs.map((faq, index) => (
          <div key={index}>
            <div
              onClick={() => {
                window.gtag('event', '6624_card_faq', { faq: String(index + 1), var: 'var1' });

                setCollapsedItem(items =>
                  items.includes(String(index + 1))
                    ? items.filter(item => item !== String(index + 1))
                    : [...items, String(index + 1)],
                );
              }}
              className={appSt.rowSb}
            >
              <Typography.Text view="primary-medium" weight="medium">
                {faq.question}
              </Typography.Text>
              {collapsedItems.includes(String(index + 1)) ? (
                <div style={{ flexShrink: 0 }}>
                  <ChevronUpMIcon />
                </div>
              ) : (
                <div style={{ flexShrink: 0 }}>
                  <ChevronDownMIcon />
                </div>
              )}
            </div>
            <Collapse expanded={collapsedItems.includes(String(index + 1))}>
              {faq.answer.map((answerPart, answerIndex) => (
                <Typography.Text key={answerIndex} tag="p" defaultMargins={false} view="primary-medium">
                  {answerPart}
                </Typography.Text>
              ))}
            </Collapse>
          </div>
        ))}
      </div>
      <Gap size={96} />

      <div className={appSt.bottomBtn}>
        <Button
          loading={loading}
          block
          view="primary"
          onClick={() => {
            window.gtag('event', '6624_card_activate', { var: 'var1' });
            setStep('step2');
          }}
        >
          Открыть счет
        </Button>
      </div>
    </>
  );
};
